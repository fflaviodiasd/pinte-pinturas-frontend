import { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Grid, Paper, darken, lighten, useTheme } from "@mui/material";
import { useClients } from "../../../hooks/useClients";
import { TitleScreen } from "../../../components/TitleScreen";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "../../../components/EditIcon";
import { TablePagination } from "../../../components/Table/Pagination";

export const ListClients = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { listClients, getAllClients, pagination, handleChangePagination } =
    useClients();
  const theme = useTheme();

  //light or dark green
  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    getAllClients();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        id: "edit",
        header: "",
        columnDefType: "display",
        muiTableHeadCellProps: {
          align: "center",
        },
        muiTableBodyCellProps: {
          align: "center",
        },

        Cell: ({ cell }) => (
          <EditIcon
            onClick={() => navigate(`/clientes/${cell.row.original.id}`)}
            label="Editar"
          />
        ),
      },

      {
        accessorKey: "tradingName",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome Fantasia",
      },
      {
        accessorKey: "responsible",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome do Responsável",
      },
      {
        accessorKey: "phoneNumber",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Telefone",
      },
      {
        accessorKey: "email",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "E-mail",
      },
      {
        accessorKey: "cnpj",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "CNPJ",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listClients,
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
            <TitleScreen title="Clientes" />
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
        {Boolean(listClients.length) && (
          <TablePagination
            count={pagination.pageQuantity}
            page={pagination.currentPage}
            onChange={handleChangePagination}
          />
        )}
      </Grid>
    </Grid>
  );
};
