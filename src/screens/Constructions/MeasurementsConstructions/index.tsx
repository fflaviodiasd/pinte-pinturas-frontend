import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Grid, Tooltip, TextField } from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete, Save, Clear } from "@mui/icons-material";
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

import { useConstructions } from "../../../hooks/useConstructions";

import { EmptyTableText } from "../../../components/Table/EmptyTableText";
import { SectionTitle } from "../../../components/SectionTitle";
import { errorMessage } from "../../../components/Messages";

import { useStyles } from "./styles";

export const MeasurementsConstructions = () => {
  const { classes } = useStyles();
  const { id } = useParams();

  const {
    listConstructionsMeasurements,
    getAllConstructionsMeasurements,
    disableConstructionMeasurements,
    addConstructionMeasurements,
    editConstructionMeasurement,
  } = useConstructions();

  const [filteredMeasurements, setFilteredMeasurements] = useState<any[]>([]);
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");
  const [editingMeasurementId, setEditingMeasurementId] = useState<number>(0);

  useEffect(() => {
    if (id) {
      getAllConstructionsMeasurements();
    }
  }, [id]);

  useEffect(() => {
    if (
      listConstructionsMeasurements &&
      listConstructionsMeasurements.length > 0
    ) {
      const filteredData = listConstructionsMeasurements.filter(
        (measurement) => measurement.construction.toString() === id
      );
      setFilteredMeasurements(filteredData);
    }
  }, [listConstructionsMeasurements, id]);

  const handleDisable = async (measurementId: number) => {
    try {
      await disableConstructionMeasurements(measurementId);
      getAllConstructionsMeasurements();
    } catch (error) {
      errorMessage("Não foi possível apagar medição!");
    }
  };

  const handleCreatePackages: MRT_TableOptions<any>["onCreatingRowSave"] =
    async ({ values, table, exitCreatingMode }) => {
      await addConstructionMeasurements(values);
      getAllConstructionsMeasurements();  
      exitCreatingMode();
    };

  const handleEditRow = (rowId: string, currentValue: string, measurementId: number) => {
    setEditingRowId(rowId);
    setEditingValue(currentValue);
    setEditingMeasurementId(measurementId);
  };

  const handleSaveRow = async (rowId: string) => {
    try {
      await editConstructionMeasurement(editingMeasurementId, editingValue);
      setEditingRowId(null);
      setEditingValue("");
      getAllConstructionsMeasurements();
    } catch (error) {
      errorMessage("Não foi possível salvar a medição!");
    }
  };

  const handleClearRow = () => {
    setEditingRowId(null);
    setEditingValue("");
  };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome da Medição",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
        },
        Cell: ({ cell, row }): React.ReactNode => {
          if (editingRowId === row.id) {
            return (
              <TextField
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
              />
            );
          }
          return cell.getValue() as React.ReactNode;
        },
      },
    ],
    [editingRowId, editingValue]
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredMeasurements,
    onCreatingRowSave: handleCreatePackages,
    createDisplayMode: "row",
    enableEditing: true,
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: { showColumnFilters: true },
    renderEmptyRowsFallback: () => <EmptyTableText />,
    muiFilterTextFieldProps: (props) => {
      return {
        placeholder: `Filtrar por ${props.column.columnDef.header}`,
      };
    },
    renderRowActions: ({ row }) => (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {editingRowId === row.id ? (
          <>
            <IconButton
              aria-label="Salvar"
              onClick={() => handleSaveRow(row.id)}
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
              onClick={() => handleEditRow(row.id, row.original.name, row.original.id)}
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
    renderTopToolbar: ({ table }) => (
      <Grid item lg={12} className={classes.headerTableContainer}>
        <SectionTitle title="Medição" />

        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <MRT_ToggleFiltersButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ShowHideColumnsButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleDensePaddingButton
            table={table}
            className={classes.toolbarButton}
          />
          <MRT_ToggleFullScreenButton
            table={table}
            className={classes.toolbarButton}
          />
          <Tooltip title="Adicionar Medição">
            <IconButton
              onClick={() => {
                table.setCreatingRow(true);
              }}
              className={classes.toolbarButton}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Grid>
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
    muiTableProps: {
      style: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
    muiTableBodyProps: {
      sx: {
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      },
    },
    mrtTheme: (theme) => ({
      draggingBorderColor: theme.palette.secondary.main,
    }),
  });

  return (
    <Grid item lg={12} className={classes.container}>
      <MaterialReactTable table={table} />
    </Grid>
  );
};
