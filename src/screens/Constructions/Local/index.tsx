import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Checkbox, Tooltip, Typography } from "@mui/material";
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

const Locations = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dynamicColumns, setDynamicColumns] = useState<MRT_ColumnDef<any>[]>(
    []
  );
  const { id } = useParams();

  const {
    listConstructionsLocations,
    getAllConstructionsLocations,
    addConstructionLocal,
    disableConstructionLocal,
  } = useConstructions();

  const [selectedLocalIds, setSelectedLocalIds] = useState<number[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { classes } = useStyles();

  useEffect(() => {
    getAllConstructionsLocations(dynamicColumns);
  }, [dynamicColumns]);

  useEffect(() => {
    const fetchLevel = async () => {
      try {
        const response = await api.get(`constructions/${id}/level_area/`);
        const level = response.data;
        const newDynamicColumns = [
          {
            accessorKey: "code",
            header: "ID",
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

        level.forEach((level: any, index: any) => {
          newDynamicColumns.push({
            accessorKey: `nivel_${level.id}`,
            header: level.name,
          });
        });
        setDynamicColumns(newDynamicColumns);
      } catch (error) {
        console.error("Erro ao buscar os níveis:", error);
      }
    };

    fetchLevel();
  }, []);

  const handleCreateLocal: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
    values,
    table,
  }) => {
    await addConstructionLocal(values, dynamicColumns);
  };

  const handleDeleteSnackbar = () => {
    selectedLocalIds.forEach(async (id) => {
      await disableConstructionLocal([id]);
    });
    setSelectedLocalIds([]);
    setSnackbarOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCheckboxClick = (id: number) => {
    const isSelected = selectedLocalIds.includes(id);
    if (isSelected) {
      setSelectedLocalIds(
        selectedLocalIds.filter((existingId) => existingId !== id)
      );
    } else {
      setSelectedLocalIds([...selectedLocalIds, id]);
    }
    setSnackbarOpen(true);
  };

  const handleOpenChecklistsDrawer = () => {
    setIsDrawerOpen(true);
  };

  const snackbarMessage =
    selectedLocalIds.length === 1
      ? `${selectedLocalIds.length} Local Selecionado`
      : `${selectedLocalIds.length} Locais Selecionados`;

  const deleteIconMessage =
    selectedLocalIds.length === 1 ? "Remover local" : "Remover locais";

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
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }),
      sx: {
        transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
      },
    }),
    renderDetailPanel: ({ row }) => (
      <ChecklistComponent localId={row.original.id} />
    ),
    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateLocal,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Checkbox
          sx={{ cursor: "pointer", color: "#C5C7C8" }}
          onClick={() => handleCheckboxClick(row.original.id)}
        />
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <SnackbarComponent
        snackbarOpen={snackbarOpen}
        handleCloseSnackbar={handleCloseSnackbar}
        message={snackbarMessage}
        checklistButton={
          <ChecklistIcon
            title={"Duplicar nomes de checklists cadastrados"}
            handleClick={handleOpenChecklistsDrawer}
          />
        }
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
          <div>
            <Button
              variant="contained"
              onClick={() => {
                table.setCreatingRow(true);
              }}
              style={{
                marginRight: "0.5rem",
                textTransform: "capitalize",
                fontFamily: "Open Sans",
                fontWeight: 600,
              }}
            >
              Adicionar Linha
            </Button>
            <Button
              variant="contained"
              style={{
                textTransform: "capitalize",
                fontFamily: "Open Sans",
                fontWeight: 600,
              }}
            >
              <GoPackage style={{ marginRight: "0.5rem" }} />
              Pacotes
            </Button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <StatusPanel />
        </div>
        <LevelComponent />
      </div>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ChecklistDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        selectedLocalIds={selectedLocalIds}
      />
    </>
  );
};

const queryClient = new QueryClient();

export const ListLocal = () => (
  <QueryClientProvider client={queryClient}>
    <Locations />
  </QueryClientProvider>
);
