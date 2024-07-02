/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from "react";
import { Chip, Grid, Typography } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { EmptyTableText } from "../../../../components/Table/EmptyTableText";
import { TablePagination } from "../../../../components/Table/Pagination";
import { useClients } from "../../../../hooks/useClients";

import { useStyles } from "../styles";

export const ListRelatedConstructions = () => {
  const { classes } = useStyles();
  //const navigate = useNavigate();
  const {
    listClientsRelatedWorks,
    getAllClientsRelatedWorks,
    pagination,
    handleChangePagination,
  } = useClients();

  useEffect(() => {
    getAllClientsRelatedWorks();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        header: "Status",
        accessorFn: (originalRow) => (originalRow.status ? "true" : "false"),
        id: "status",
        filterVariant: "checkbox",
        Cell: ({ cell }) => {
          const status = cell.getValue() === "true" ? "Ativo" : "Inativo";
          const chipColor = status === "Ativo" ? "success" : "error";
          return <Chip label={status} color={chipColor} />;
        },
        size: 170,
      },
      {
        accessorKey: "constructionName",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome da Obra",
      },
      {
        accessorKey: "responsible",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Responsável",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listClientsRelatedWorks,
    enableColumnFilterModes: true,
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: { showColumnFilters: true },
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
      {/* {Boolean(listClientsRelatedWorks.length) && (
          <TablePagination
            count={pagination.pageQuantity}
            page={pagination.currentPage}
            onChange={handleChangePagination}
          />
        )} */}
    </Grid>
  );
};
