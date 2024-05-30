/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from "react";
import { Chip, Grid } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { EmptyTableText } from "../../../../components/Table/EmptyTableText";
import { BackgroundAvatar } from "../../../../components/BackgroundAvatar";
import { TablePagination } from "../../../../components/Table/Pagination";
import { useClients } from "../../../../hooks/useClients";
import { useStyles } from "../styles";

export const ListEmployees = () => {
  const { classes } = useStyles();

  const {
    listClientsEmployees,
    getAllClientsEmployees,
    pagination,
    handleChangePagination,
  } = useClients();

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
    enablePagination: false,
    enableBottomToolbar: false,
    muiFilterTextFieldProps: (props) => {
      return {
        placeholder: `Filtrar por ${props.column.columnDef.header}`,
      };
    },
    muiFilterCheckboxProps: (props) => {
      return {
        title: `Filtrar por ${props.column.columnDef.header}`,
      };
    },
    renderEmptyRowsFallback: () => <EmptyTableText />,
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
    <Grid item lg={12} className={classes.tableContainer}>
      <MaterialReactTable table={table} />
      {/* {listClientsEmployees.length > 0 && (
        <TablePagination
          count={pagination.pageQuantity}
          page={pagination.currentPage}
          onChange={handleChangePagination}
        />
      )} */}
    </Grid>
  );
};
