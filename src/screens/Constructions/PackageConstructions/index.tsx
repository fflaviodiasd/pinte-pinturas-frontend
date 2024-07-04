/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableOptions,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
} from "material-react-table";

import {
  Box,
  Grid,
  Tooltip,
  Typography,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useConstructions } from "../../../hooks/useConstructions";
import { Add, Delete, Edit as EditIcon, Save, Clear } from "@mui/icons-material";
import { errorMessage, successMessage } from "../../../components/Messages";
import { ServiceStepTable } from "./ServiceStepsTable";
import { useStyles } from "./styles";

interface DropdownOption {
  id: any;
  name: any;
  label: string;
  value: any;
}

export const PackageConstructions = () => {
  const { classes } = useStyles();

  const {
    listConstructionPackages,
    getAllConstructionPackages,
    disableConstructionPackage,
    addConstructionPackage,
    getAllDisciplines,
    editConstructionPackage,
  } = useConstructions();

  const [disciplineOptions, setDisciplineOptions] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isAddingDiscipline, setIsAddingDiscipline] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<{ name: string; order?: number; discipline?: string }>({ name: "" });
  const [editingPackageId, setEditingPackageId] = useState<number>(0);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getAllConstructionPackages();
    }
  }, [id]);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const data = await getAllDisciplines();
        if (data && Array.isArray(data.results)) {
          const options: DropdownOption[] = data.results.map(
            (d: { name: any }) => ({
              label: d.name,
              value: d.name,
            })
          );
          setDisciplineOptions(options);
          console.log("Discipline options fetched:", options);
        } else {
          console.error("Formato inesperado da resposta:", data);
          setDisciplineOptions([]);
        }
      } catch (error) {
        errorMessage("Não foi possível carregar disciplinas!");
        setDisciplineOptions([]);
      }
    };
    fetchDisciplines();
  }, []);

  const handleAddNewDiscipline = (newDiscipline: any) => {
    const newOption = { label: newDiscipline, value: newDiscipline };
    setDisciplineOptions([...disciplineOptions, newOption]);
    setSelectedDiscipline(newDiscipline);
    setIsAddingDiscipline(false);
  };

  const handleSelectChange = (e: any) => {
    if (e) {
      const value = e.value;
      setSelectedDiscipline(value);
      handleAddNewDiscipline(value);
    }
  };

  const handleValueChange = (e: any) => {
    if (e) {
      const value = e;
      setSelectedDiscipline(value);
      handleAddNewDiscipline(value);
      console.log("Selected discipline:", value);
    }
  };

  const handleDisable = async (packageId: number) => {
    try {
      await disableConstructionPackage(packageId);
      successMessage("Pacote apagado com sucesso!");
      getAllConstructionPackages();
    } catch (error) {
      errorMessage("Não foi possível apagar pacote!");
    }
  };

  const handleCreatePackages: MRT_TableOptions<any>["onCreatingRowSave"] =
    async ({ values, table }) => {
      const { id, ...restOfValues } = values;

      const adjustedValues = {
        ...restOfValues,
        discipline: selectedDiscipline,
      };
      await addConstructionPackage(adjustedValues);
      getAllConstructionPackages();
      setSelectedDiscipline(null);
      table.setCreatingRow(null);
    };

  const handleEditRow = (rowId: string, currentValue: { name: string; order?: number; discipline?: string }, packageId: number) => {
    setEditingRowId(rowId);
    setEditingValue(currentValue);
    setEditingPackageId(packageId);
  };

  const handleSaveRow = async ({ exitEditingMode, row, values }: any) => {
    const discipline = typeof values.discipline === 'object' ? values.discipline.value : values.discipline;
    try {
      await editConstructionPackage(editingPackageId, { ...values, discipline });
      setEditingRowId(null);
      setEditingValue({ name: "" });
      getAllConstructionPackages();
      exitEditingMode();
    } catch (error) {
      errorMessage("Não foi possível salvar o pacote!");
    }
  };

  const handleClearRow = () => {
    setEditingRowId(null);
    setEditingValue({ name: "" });
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "ID",
        enableEditing: false,
      },
      {
        accessorKey: "order",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Ordem",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
          type: "number",
        },
        Cell: ({ cell, row }): React.ReactNode => {
          if (editingRowId === row.id) {
            return (
              <TextField
                value={editingValue.order ?? ""}
                onChange={(e) => setEditingValue({ ...editingValue, order: Number(e.target.value) })}
              />
            );
          }
          return cell.getValue() as React.ReactNode;
        },
      },
      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome do Pacote",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
        },
        Cell: ({ cell, row }): React.ReactNode => {
          if (editingRowId === row.id) {
            return (
              <TextField
                value={editingValue.name}
                onChange={(e) => setEditingValue({ ...editingValue, name: e.target.value })}
              />
            );
          }
          return cell.getValue() as React.ReactNode;
        },
      },
      {
        accessorKey: "discipline.name",
        header: "Disciplina",
        required: true,
        enableEditing: true,
        Cell: ({ cell, row }): React.ReactNode => {
          if (editingRowId === row.id) {
            return (
              <Autocomplete
                disablePortal
                value={editingValue.discipline}
                onChange={(event: any, newValue: string | null) => {
                  setEditingValue({ ...editingValue, discipline: newValue! });
                  handleSelectChange(newValue);
                }}
                onInputChange={(event: any, newValue: string | null) => {
                  setEditingValue({ ...editingValue, discipline: newValue! });
                  handleValueChange(newValue);
                }}
                freeSolo
                options={disciplineOptions}
                sx={{ marginBottom: "16px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Disciplina"
                    variant="standard"
                  />
                )}
              />
            );
          }
          return cell.getValue() as React.ReactNode;
        },
        Edit: () => (
          <Autocomplete
            disablePortal
            value={selectedDiscipline}
            onChange={(event: any, newValue: string | null) => {
              handleSelectChange(newValue);
            }}
            onInputChange={(event: any, newValue: string | null) => {
              handleValueChange(newValue);
            }}
            freeSolo
            options={disciplineOptions}
            sx={{ marginBottom: "16px" }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Disciplina"
                variant="standard"
              />
            )}
          />
        ),
      },
      {
        accessorKey: "package_value",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Valor do Pacote",
        enableEditing: false,
      },
      {
        accessorKey: "package_workmanship",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Pacote M.O",
        enableEditing: false,
      },
      {
        accessorKey: "workmanship_total",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "M.O/Total",
        enableEditing: false,
      },
    ],
    [disciplineOptions, selectedDiscipline, editingRowId, editingValue]
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructionPackages,
    enableColumnFilterModes: true,
    onCreatingRowSave: handleCreatePackages,
    onEditingRowSave: handleSaveRow,
    enableEditing: true,
    editDisplayMode: "row",
    createDisplayMode: "row",
    state: {
      isSaving,
    },
    renderRowActions: ({ row, table }) => (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {editingRowId === row.id ? (
          <>
            <IconButton
              aria-label="Salvar"
              onClick={() => handleSaveRow({ exitEditingMode: table.setEditingRow, row, values: editingValue })}
              sx={{ color: "#C5C7C8" }}
            >
              <Save />
            </IconButton>
            <IconButton
              aria-label="Limpar"
              onClick={handleClearRow}
              sx={{ color: "#C5C7C8" }}
            >
              <Clear />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              aria-label="Editar"
              onClick={() => handleEditRow(row.id, { name: row.original.name, order: row.original.order, discipline: row.original.discipline?.name }, row.original.id)}
              sx={{ color: "#C5C7C8" }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Excluir"
              onClick={() => handleDisable(row.original.id)}
              sx={{ color: "#C5C7C8" }}
            >
              <Delete />
            </IconButton>
          </>
        )}
      </div>
    ),
    initialState: { showColumnFilters: true },
    renderDetailPanel: ({ row }) => (
      <Box sx={{ padding: "1rem" }}>
        <ServiceStepTable order={row.original.id} />
      </Box>
    ),
    renderTopToolbar: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          padding: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "30%",
              height: "3px",
              backgroundColor: "#1976d2",
              position: "absolute",
              bottom: 0,
            },
          }}
        >
          <Typography variant="h5" component="div" gutterBottom>
            Pacotes Cadastrados
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <MRT_ToggleFiltersButton
            table={table}
            sx={{
              color: "#0076be",
              border: "1px solid #0076be",
              borderRadius: "4px",
            }}
          />
          <MRT_ShowHideColumnsButton
            table={table}
            sx={{
              color: "#0076be",
              border: "1px solid #0076be",
              borderRadius: "4px",
            }}
          />
          <MRT_ToggleDensePaddingButton
            table={table}
            sx={{
              color: "#0076be",
              border: "1px solid #0076be",
              borderRadius: "4px",
            }}
          />
          <MRT_ToggleFullScreenButton
            table={table}
            sx={{
              color: "#0076be",
              border: "1px solid #0076be",
              borderRadius: "4px",
            }}
          />
          <Tooltip title="Adicionar Pacote">
            <IconButton
              onClick={() => {
                table.setCreatingRow(true);
              }}
              sx={{
                color: "#0076be",
                border: "1px solid #0076be",
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: "rgba(0, 118, 190, 0.04)",
                },
              }}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    ),
    filterFns: {
      customFilterFn: (row, id, filterValue) => {
        return row.getValue(id) === filterValue;
      },
    },
    localization: {
      filterCustomFilterFn: "Custom Filter Fn",
    } as any,
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td': {
          backgroundColor: "#FAFAFA",
        },
      },
    },
    mrtTheme: (theme) => ({
      draggingBorderColor: theme.palette.secondary.main,
    }),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  return (
    <Grid item lg={12} className={classes.container}>
      <MaterialReactTable table={table} />
    </Grid>
  );
};
