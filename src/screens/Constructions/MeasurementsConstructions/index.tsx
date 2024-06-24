/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconButton, Grid, Tooltip } from "@mui/material";
import { Add as AddIcon, Delete } from "@mui/icons-material";
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
  } = useConstructions();

  const [filteredMeasurements, setFilteredMeasurements] = useState<any[]>([]);

  // console.log('construction id pac: ', selectedPackageConstructionId)
  // console.log("listConstructionsMeasurements: ", listConstructionsMeasurements);

  useEffect(() => {
    if (id) {
      getAllConstructionsMeasurements();
    }
  }, [id]);

  useEffect(() => {
    if (
      listConstructionsMeasurements &&
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
      // successMessage("Medição apagada com sucesso!");
      getAllConstructionsMeasurements();
    } catch (error) {
      errorMessage("Não foi possível apagar medição!");
    }
  };

  const handleCreatePackages: MRT_TableOptions<any>["onCreatingRowSave"] =
    async ({ values, table, exitCreatingMode }) => {
      // console.log("values for API:", values);

      await addConstructionMeasurements(values);
      getAllConstructionsMeasurements();  
      exitCreatingMode();

    };

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome do Pacote",
        enableEditing: true,
        muiEditTextFieldProps: {
          required: true,
        },
      },
    ],
    []
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
        <IconButton
          aria-label="Excluir"
          onClick={() => handleDisable(row.original.id)}
          sx={{ color: "#C5C7C8" }}
        >
          <Delete />
        </IconButton>
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
          <Tooltip title="Adicionar Material">
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
