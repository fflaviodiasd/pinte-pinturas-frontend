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

import { useStyles } from "../styles";
import { useCollaborators } from "../../../../hooks/useCollaborators";

export const History = () => {
  const { classes } = useStyles();
  //const navigate = useNavigate();
  const {
    listCollaboratorsHistory,
    getAllCollaboratorsHistory,
    pagination,
    handleChangePagination,
  } = useCollaborators();

  useEffect(() => {
    getAllCollaboratorsHistory();
  }, []);

  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "role",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Cargo",
      },
      {
        accessorKey: "dismissalDate",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Data de Demissão",
      },
      {
        accessorKey: "salary",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Salário",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listCollaboratorsHistory,
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
