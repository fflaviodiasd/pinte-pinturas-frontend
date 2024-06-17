/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DownloadRounded as DownloadIcon } from "@mui/icons-material";

import {
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { DashboardContext } from "../../../../contexts/DashboardContext";

import { EmptyTableText } from "../../../../components/Table/EmptyTableText";

import { useStyles } from "./styles";

export const Table = () => {
  const { classes } = useStyles();
  const { dashboardGeneralData, variableLevels } = useContext(DashboardContext);

  const variableColumns: MRT_ColumnDef<any>[] = variableLevels.map(
    (item, index) => ({
      accessorKey: item,
      header: `Nível ${variableLevels.length - index}`,
      size: 200,
    })
  );

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    return [
      {
        accessorKey: "construction",
        header: "Obra",
        size: 200,
      },
      { accessorKey: "area", header: "ID", size: 200 },
    ]
      .concat(variableColumns)
      .concat([
        { accessorKey: "checklist", header: "Checklist", size: 200 },
        { accessorKey: "package", header: "Pacote", size: 200 },
        { accessorKey: "measurement", header: "Medição", size: 200 },
        { accessorKey: "team", header: "Equipe", size: 200 },
        {
          accessorKey: "released_typed",
          header: "Liberado Digitado",
          size: 250,
        },
        {
          accessorKey: "released_system",
          header: "Liberado Sistema",
          size: 250,
        },
        { accessorKey: "released_user", header: "Liberado Usuário", size: 250 },
        { accessorKey: "started_system", header: "Iniciado", size: 250 },
        {
          accessorKey: "started_typed",
          header: "Iniciado Digitado",
          size: 250,
        },
        {
          accessorKey: "finished_typed",
          header: "Finalizado Digitado",
          size: 250,
        },
        {
          accessorKey: "delivered_typed",
          header: "Entregue Digitado",
          size: 250,
        },
        { accessorKey: "link", header: "LINK", size: 250 },
      ]);
  }, []);

  const table = useMaterialReactTable({
    columns: columns,
    data: dashboardGeneralData,
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: { showColumnFilters: true },
    muiFilterTextFieldProps: (props) => {
      return {
        placeholder: `Filtrar por ${props.column.columnDef.header}`,
      };
    },
    renderEmptyRowsFallback: () => <EmptyTableText />,
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableBodyProps: {
      sx: () => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FFF",
          },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      }),
    },
    muiTableProps: {
      style: {
        display: "flex",
        flexDirection: "column",
      },
    },
    renderTopToolbar: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "#FFF",
          padding: 1,
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
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
          <Tooltip title="Adicionar Pacote">
            <IconButton
              // onClick={() => {
              //   table.(true);
              // }}
              className={classes.toolbarButton}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};
