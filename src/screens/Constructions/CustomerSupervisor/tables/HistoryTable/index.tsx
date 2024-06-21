/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
} from "material-react-table";
import { Grid, Typography } from "@mui/material";

import { EmptyTableText } from "../../../../../components/Table/EmptyTableText";
import { BackgroundAvatar } from "../../../../../components/BackgroundAvatar";
import { SectionTitle } from "../../../../../components/SectionTitle";

import { useStyles } from "../styles";

type HistoryItem = {
  avatar: string;
  exit_dt: string;
  inclusion_dt: string;
  name: string;
  office: string;
  profile: string;
};

type HistoryTableProps = {
  historyData: HistoryItem[];
};

export const HistoryTable = ({ historyData }: HistoryTableProps) => {
  const { classes } = useStyles();

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Nome Completo",
        enableEditing: false,
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <BackgroundAvatar avatarName={cell.row.original.name} />
            <Typography className={classes.nameCellText}>
              {cell.row.original.name}
            </Typography>
          </div>
        ),
      },
      {
        accessorKey: "office",
        header: "Cargo",
        enableEditing: false,
      },
      {
        accessorKey: "inclusion_dt",
        header: "Data de Inclusão",
        enableEditing: false,
      },
      {
        accessorKey: "exit_dt",
        header: "Data de Saída",
        enableEditing: false,
      },
      {
        accessorKey: "profile",
        header: "Perfil",
        enableEditing: false,
      },
    ],
    []
  );

  const tableInstance = useMaterialReactTable({
    columns,
    data: historyData,
    enableEditing: false,
    enablePagination: false,
    enableBottomToolbar: false,
    createDisplayMode: "row",
    renderEmptyRowsFallback: () => <EmptyTableText />,
    renderTopToolbar: ({ table }) => (
      <Grid item lg={12} className={classes.headerTableContainer}>
        <SectionTitle title="Histórico" />

        <div className={classes.tableButtonsContainer}>
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
        </div>
      </Grid>
    ),
    muiTablePaperProps: {
      elevation: 0,
    },
    muiTableProps: {
      style: {
        paddingLeft: 12,
        paddingRight: 12,
      },
    },
  });

  return <MaterialReactTable table={tableInstance} />;
};
