import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Chip, Grid, Paper, useTheme } from "@mui/material";
import { TitleScreen } from "../../../components/TitleScreen";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "../../../components/EditIcon";
import { TablePagination } from "../../../components/Table/Pagination";
import { BackgroundAvatar } from "../../../components/Avatar";
import { useConstructions } from "../../../hooks/useConstructions";

export const ListConstructions = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { listConstructions, getAllConstructions } = useConstructions();
  const theme = useTheme();

  const [selectedConstructionId, setselectedConstructionId] =
    useState<number>(0);

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    getAllConstructions();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "edit",
        header: "",
        columnDefType: "display",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <EditIcon
              onClick={() => navigate(`/obras/${cell.row.original.id}`)}
              label="Editar"
            />
          </div>
        ),
      },
      {
        header: "Status",
        accessorFn: (originalRow) => (originalRow.active ? "true" : "false"),
        id: "active",
        filterVariant: "checkbox",
        Cell: ({ cell }) => {
          const status = cell.getValue() === "true" ? "Ativo" : "Inativo";
          const chipColor = status === "Ativo" ? "success" : "error";
          return <Chip label={status} color={chipColor} />;
        },
        size: 170,
      },

      {
        accessorKey: "name",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome da Obra",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",

              alignItems: "center",
            }}
          >
            {cell.row.original.name && (
              <BackgroundAvatar avatarName={cell.row.original.name} />
            )}
            {cell.row.original.name}
          </div>
        ),
      },
      {
        accessorKey: "client",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Cliente",
      },
      {
        accessorKey: "responsible",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Encarregado",
      },
      {
        accessorKey: "percentageCompleted",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Execução",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listConstructions,
    enableColumnFilterModes: true,
    initialState: { showColumnFilters: true },
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
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: "#FAFAFA",
          },
      }),
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: baseBackgroundColor,
      draggingBorderColor: theme.palette.secondary.main,
    }),
    enablePagination: false,
    enableBottomToolbar: false,
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Paper className={classes.paper}>
          <div className={classes.searchBarContainer}>
            <TitleScreen title="Obras" />
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
      </Grid>
    </Grid>
  );
};
