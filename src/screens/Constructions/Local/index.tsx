import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
  MRT_Cell,
} from "material-react-table";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConstructions } from "../../../hooks/useConstructions";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { LevelComponent } from "../../../components/Level";
import { ChecklistComponent } from "../../../components/Checklist";
import SnackbarComponent from "../../../components/Snackbar";
import { SnackbarDeleteIcon } from "../../../components/Snackbar/DeleteIcon";
import { ChecklistIcon } from "../../../components/Snackbar/ChecklistIcon";
import { ChecklistDrawer } from "../../../components/Checklist/ChecklistDrawer";
import { StatusPanel } from "../../../components/StatusPanel";
import { Info } from "@mui/icons-material";
import { useStyles } from "./styles";
import { GoPackage } from "react-icons/go";
import { ModalPackages } from "../../../components/Modal/ModalPackages";
import SelectLine from "../../../components/SelectLine";
import "./style.css";
import { successMessage } from "../../../components/Messages";
const Locations = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dynamicColumns, setDynamicColumns] = useState<
    CustomMRT_ColumnDef<any>[]
  >([]);
  const { id } = useParams();

  const {
    listConstructionsLocations,
    getAllConstructionsLocations,
    addConstructionLocal,
    disableConstructionLocal,
    setListConstructionsLocations,
  } = useConstructions();

  const [selectedLocalIds, setSelectedLocalIds] = useState<number[]>([]);
  const [selectedLocalIdsPaste, setSelectedLocalIdsPaste] = useState<number[]>(
    []
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { classes } = useStyles();
  const [modalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [valueActual, setValueActual] = useState();
  const [control, setControl] = useState();
  const [disabledButton, setDisabledButton] = useState(false);
  const [listChecked, setListChecked] = useState<any[]>([]);
  const [listCheckedPaste, setListCheckedPaste] = useState<any[]>([]);
  const [paste, setPaste] = useState<any>();

  type CustomMRT_ColumnDef<T> = MRT_ColumnDef<any> & {
    muiTableBodyCellProps?: (cell: MRT_Cell<any>) => {
      onChange: (e: any) => void;
    };
  };

  const generateNextId = (rowCount: any) => {
    const nextId = rowCount;
    return `L${nextId.toString().padStart(4, "0")}`;
  };

  const [rowCount, setRowCount] = useState(0);

  const [editState, setEditState] = useState({
    rowId: null,
    value: "",
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setRowCount(listConstructionsLocations.length);
  }, [listConstructionsLocations]);

  useLayoutEffect(() => {
    if (!isLoaded && dynamicColumns.length > 0) {
      getAllConstructionsLocations(dynamicColumns);
      setIsLoaded(true);
    }
  }, [dynamicColumns]);

  const [pendingUpdates, setPendingUpdates] = useState<any>([]);

  useEffect(() => {
    //ESSE EFFECT CONTROLA AS ATUALIZAÇÕES PENDENTES, ELE CHECA SE HÁ ALGUMA, E ENTÃO COLOCA ELA NA LISTA
    if (pendingUpdates.length > 0) {
      setListConstructionsLocations((current) => [
        ...current,
        ...pendingUpdates,
      ]);
      setPendingUpdates([]); // LIMPA TODAS AS ATUALIZAÇÕES PENDENTES
    }
  }, [pendingUpdates]);

  const updateLocationData = (cell: any, newValue: any) => {
    //CRIEI UMA FUNÇÃO QUE ATUALIZA A CÉLULA EM VEZ DE ATUALIZAR DIRETO DENTRO DO CHANGE, NESSA EU USO UMA FUNÇÃO DE CALLBACK DO PRÓRPIO SET DO USESTATE PARA GARANTIR QUE VOU USAR A VERSÃO MAIS ATUALIZADA DA LISTA
    setListConstructionsLocations((currentLocations) => {
      return currentLocations.map((location) => {
        if (location.code === cell?.row?.original?.code) {
          //CRIO UMA NOVA COPIA DA LISTA PRA EVITAR QUE TENHA UMA MUTAÇÃO DIRETA
          const updatedLocation = { ...location, [cell.column.id]: newValue };

          //SE TIVER CAMPOS NAS CELULAS, ATUALIZO
          if (updatedLocation.ids) {
            updatedLocation.ids = updatedLocation.ids.map((itemId: any) => {
              if (itemId.id_ref === +cell.column.id.slice(6)) {
                return { ...itemId, name: newValue };
              }
              return itemId;
            });
          }

          return updatedLocation;
        }
        return location;
      });
    });
  };

  useLayoutEffect(() => {
    const fetchLevel = async () => {
      try {
        const { data } = await api.get(`constructions/${id}/level_area/`);
        const newDynamicColumns: CustomMRT_ColumnDef<any>[] = [
          {
            accessorKey: "code",
            header: "ID",
            enableEditing: false,
            Cell: ({ row }: any) => {
              {
                editState.rowId === row.id
                  ? (row.original.code = generateNextId(rowCount))
                  : null;
              }
              return (
                <div>
                  {editState.rowId === row.id
                    ? row.original.code || generateNextId(rowCount)
                    : row.original.code}
                </div>
              );
            },
          },
          {
            accessorKey: "checklist",
            header: "Checklist",
            enableEditing: false,
            Cell: ({ cell }: any) => (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <Tooltip title="Checklists">
                  <Info fontSize="small" style={{ color: "#C5C7C8" }} />
                </Tooltip>
                {cell.row.original.checklist}
              </div>
            ),
          },
        ];

        data.forEach((level: any, index: any) => {
          newDynamicColumns.push({
            accessorKey: `nivel_${level.id}`,
            header: level.name,
            muiTableBodyCellProps: ({ cell }: any) => ({
              onChange: (e: any) => {
                setValueActual(e.target.value);
                const newValue = e.target.value;
                updateLocationData(cell, newValue);
              },
            }),
          });
        });
        setDynamicColumns(newDynamicColumns);
      } catch (error) {
        console.error("Erro ao buscar os níveis:", error);
      }
    };

    fetchLevel();
  }, [valueActual, editState, control]);

  const handleCreateLocal = async () => {
    {
      /*} const code = generateNextId(rowCount);
      listConstructionsLocations[listConstructionsLocations.length - 1].code =
        code;
    */
    }
    await addConstructionLocal(dynamicColumns, listConstructionsLocations);
  };

  const handleDeleteSnackbar = () => {
    selectedLocalIds.forEach(async (id) => {
      await disableConstructionLocal([id]);
      getAllConstructionsLocations(dynamicColumns);
    });
    setSelectedLocalIds([]);
    setSnackbarOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const [selectedRows, setSelectedRows] = useState(new Set<number>());
  const [selectedRowsPaste, setSelectedRowsPaste] = useState(new Set<number>());
  const [copyLines, setCopyLines] = useState<boolean>(false);

  useEffect(() => {
    if (copyLines) {
      successMessage("Selecione em qual linha você quer colar");
    }
  }, [copyLines]);

  function updateArray(
    originalArray: any[],
    copiedItems: any[],
    pasteItems: any[]
  ) {
    let copiedIndex = 0;

    pasteItems.forEach((pasteItem) => {
      const newItem = { ...copiedItems[copiedIndex] };
      const originalItemIndex = originalArray.findIndex(
        (item) => item.code === pasteItem.code
      );

      if (originalItemIndex !== -1) {
        const originalItem = originalArray[originalItemIndex];

        for (const key in newItem) {
          if (key === "ids") {
            originalItem[key].forEach((item: any, index) => {
              originalItem.ids[index].name = newItem.ids[index].name;
            });
          }

          if (key !== "id" && key !== "code" && key !== "ids") {
            originalItem[key] = newItem[key];
          }
        }
        copiedIndex = (copiedIndex + 1) % copiedItems.length;
      }
    });
    console.log(originalArray);

    return originalArray;
  }

  function pasteLines() {
    successMessage("Você colou a(s) linha(s)");
    setCopyLines(false);
    const newSetEmpty = new Set<number>();
    setSelectedRows(newSetEmpty);
    setSelectedLocalIds([]);
    setListChecked([]);
    const updatedArray = updateArray(
      [...listConstructionsLocations],
      listChecked,
      listCheckedPaste
    );
    setListConstructionsLocations(updatedArray);
  }

  const handleCheckboxClick = (item: any) => {
    if (copyLines) {
      setPaste(true);
      setListCheckedPaste((prev) => {
        if (prev.includes(item)) {
          return prev.filter((i) => i !== item);
        } else {
          const newItem = item.original;
          newItem.id_false = newItem.id ? null : item.id;
          newItem.index = item.index;
          return [...prev, newItem];
        }
      });

      setSelectedRowsPaste((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(+item.id)) {
          newSet.delete(+item.id);
        } else {
          newSet.add(+item.id);
        }
        return newSet;
      });

      const isSelectedPaste = selectedLocalIdsPaste.includes(+item.id);
      if (isSelectedPaste) {
        setSelectedLocalIdsPaste(
          selectedLocalIdsPaste.filter((existingId) => existingId !== +item.id)
        );
      } else {
        setSelectedLocalIdsPaste([...selectedLocalIdsPaste, +item.id]);
      }
    } else {
      setPaste(false);
      setListChecked((prev) => {
        if (prev.includes(item)) {
          return prev.filter((i) => i !== item);
        } else {
          const newItem = item.original;
          newItem.id_false = newItem.id ? null : item.id;
          return [...prev, newItem];
        }
      });

      setSelectedRows((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(+item.id)) {
          newSet.delete(+item.id);
        } else {
          newSet.add(+item.id);
        }
        return newSet;
      });

      const isSelected = selectedLocalIds.includes(+item.id);
      if (isSelected) {
        setSelectedLocalIds(
          selectedLocalIds.filter((existingId) => existingId !== +item.id)
        );
      } else {
        setSelectedLocalIds([...selectedLocalIds, +item.id]);
      }
    }
    setSnackbarOpen(true);
  };

  const handleOpenChecklistsDrawer = () => {
    setIsDrawerOpen(true);
  };

  const snackbarMessage =
    selectedLocalIds.length === 1
      ? `${selectedLocalIds.length} ${
          copyLines ? "Local Copiado" : "Local Selecionado"
        }`
      : `${selectedLocalIds.length} ${
          copyLines ? "Locais Copiados" : "Locais Selecionados"
        }`;

  const snackbarMessagePaste =
    selectedLocalIdsPaste.length === 1
      ? ` ${selectedLocalIdsPaste.length} Local Selecionado para colar `
      : selectedLocalIdsPaste.length > 1
      ? ` ${selectedLocalIdsPaste.length} Locais Selecionados para colar`
      : null;

  const deleteIconMessage =
    selectedLocalIds.length === 1 ? "Remover local" : "Remover locais";

  const addNewLine = (numLines: number) => {
    setDisabledButton(true);
    const newLines: any = [];
    for (let i = 0; i < numLines; i++) {
      const lastItem = Number(
        listConstructionsLocations[
          listConstructionsLocations.length - 1
        ].code.slice(-2)
      );

      const code = generateNextId(lastItem + i + 1);
      const control = {};
      dynamicColumns.forEach((column, index) => {
        if (index >= 2) control[column.id] = "";
      });
      const newLine = { checklist: 0, code: code, id: null, ...control };
      newLines.push(newLine);
    }
    // Adiciona as novas linhas de uma vez
    setPendingUpdates((currentUpdates: any) => [
      ...currentUpdates,
      ...newLines,
    ]);
    setTimeout(() => {
      setDisabledButton(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const { data } = await api.get(`constructions/${id}/level_area/`);
        const newDynamicColumns: CustomMRT_ColumnDef<any>[] = [
          {
            accessorKey: "code",
            header: "ID",
            enableEditing: false,
            Cell: ({ row }: any) => {
              {
                editState.rowId === row.id
                  ? (row.original.code = generateNextId(rowCount))
                  : null;
              }
              return (
                <div>
                  {editState.rowId === row.id
                    ? row.original.code || generateNextId(rowCount)
                    : row.original.code}
                </div>
              );
            },
          },
          {
            accessorKey: "checklist",
            header: "Checklist",
            enableEditing: false,
            Cell: ({ cell }: any) => (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <Tooltip title="Checklists">
                  <Info fontSize="small" style={{ color: "#C5C7C8" }} />
                </Tooltip>
                {cell.row.original.checklist}
              </div>
            ),
          },
        ];

        data.forEach((level: any) => {
          newDynamicColumns.push({
            accessorKey: `nivel_${level.id}`,
            header: level.name,
            muiTableBodyCellProps: ({ cell }: any) => ({
              onChange: (e: any) => {
                setValueActual(e.target.value);
                const newValue = e.target.value;
                updateLocationData(cell, newValue);
              },
            }),
          });
        });
        getAllConstructionsLocations(newDynamicColumns);
      } catch (error) {
        console.error("Erro ao buscar os níveis:", error);
      }
    };
    fetchLevel();
  }, [control]);

  const table = useMaterialReactTable({
    columns: dynamicColumns,
    data: listConstructionsLocations,
    createDisplayMode: "row",
    editDisplayMode: "cell",
    enableClickToCopy: false,
    enableColumnPinning: true,
    enableEditing: true,
    enableRowActions: true,
    enableExpandAll: true,
    enablePagination: false,
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      sx: {
        transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
      },
    }),
    renderDetailPanel: ({ row }) => {
      const shouldRenderChecklist =
        row.original && !row.original.lastLevelIsBlank;

      return (
        <div>
          {shouldRenderChecklist && (
            <ChecklistComponent localId={row.original.id} />
          )}
        </div>
      );
    },
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    // onCreatingRowSave: handleCreateLocal,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Checkbox
          checked={
            selectedLocalIds.includes(+row.id) ||
            selectedLocalIdsPaste.includes(+row.id)
          }
          sx={{ cursor: "pointer", color: "#C5C7C8" }}
          onClick={() => handleCheckboxClick(row)}
        />
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <SnackbarComponent
        snackbarOpen={snackbarOpen}
        handleCloseSnackbar={handleCloseSnackbar}
        message={snackbarMessage}
        messagePaste={snackbarMessagePaste}
        checklistButton={
          <ChecklistIcon
            title={"Duplicar nomes de checklists cadastrados"}
            handleClick={handleOpenChecklistsDrawer}
          />
        }
        copyLine={() => (copyLines ? setCopyLines(false) : setCopyLines(true))}
        paste={paste}
        pasteLines={pasteLines}
        deleteButton={<SnackbarDeleteIcon title={deleteIconMessage} />}
        handleDeleteSnackbar={handleDeleteSnackbar}
      />
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography className={classes.underlinedTitle}>
            <span className={classes.underlinedBorder}>Gerenc</span>
            iamento
          </Typography>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <SelectLine
              addNewLine={addNewLine}
              button={
                <Button
                  variant={disabledButton ? "outlined" : "contained"}
                  onClick={() => addNewLine(1)}
                  disabled={disabledButton}
                  style={{
                    marginRight: "0.5rem",
                    textTransform: "capitalize",
                    fontFamily: "Open Sans",
                    fontWeight: 600,
                    color: disabledButton ? "#0076BE" : "",
                    border: disabledButton ? "1px solid #0076BE" : "",
                  }}
                >
                  Adicionar Linha
                </Button>
              }
            />
            <Button
              variant="contained"
              style={{
                textTransform: "capitalize",
                fontFamily: "Open Sans",
                fontWeight: 600,
              }}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <GoPackage style={{ marginRight: "0.5rem" }} />
              Pacotes
            </Button>
            <Button
              variant="contained"
              onClick={handleCreateLocal}
              style={{
                marginLeft: "0.5rem",
                textTransform: "capitalize",
                fontFamily: "Open Sans",
                fontWeight: 600,
              }}
            >
              Salvar
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <StatusPanel />
        </div>
        <LevelComponent setControl={setControl} />
      </div>
    ),
    muiTableBodyRowProps: ({ row }) => {
      let className = "";
      if (copyLines && selectedRows.has(+row.id)) {
        className = "selected-row";
      }
      if (selectedRowsPaste.has(+row.id)) {
        className += " selected-row-paste";
      }
      return {
        className,
      };
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ChecklistDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedLocalIds={selectedLocalIds}
      />
      <ModalPackages modalOpen={modalOpen} handleClose={handleClose} />
    </>
  );
};

const queryClient = new QueryClient();

export const ListLocal = () => (
  <QueryClientProvider client={queryClient}>
    <Locations />
  </QueryClientProvider>
);
