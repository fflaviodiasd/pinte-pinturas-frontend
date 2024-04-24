import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Chip, Grid, useTheme } from "@mui/material";
//import { useStyles } from "./styles";
//import { useNavigate } from "react-router-dom";
import { BackgroundAvatar } from "../../../components/Avatar";
import { useClients } from "../../../hooks/useClients";
import { TablePagination } from "../../../components/Table/Pagination";

export const ListClientsEmployees = () => {
  //const { classes } = useStyles();
  //const navigate = useNavigate();
  const {
    listClientsEmployees,
    getAllClientsEmployees,
    pagination,
    handleChangePagination,
  } = useClients();
  const theme = useTheme();

  const [selectedClientEmployeeId, setselectedClientEmployeeId] =
    useState<number>(0);

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    getAllClientsEmployees();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
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
        accessorKey: "fullName",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome Completo",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",

              alignItems: "center",
            }}
          >
            {cell.row.original.fullName && (
              <BackgroundAvatar avatarName={cell.row.original.fullName} />
            )}
            {cell.row.original.fullName}
          </div>
        ),
      },
      {
        accessorKey: "cell_phone",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Celular",
      },
      {
        accessorKey: "role",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Cargo",
      },
      {
        accessorKey: "profile",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Perfil",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listClientsEmployees,
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
        <MaterialReactTable table={table} />
        {Boolean(listClientsEmployees.length) && (
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
