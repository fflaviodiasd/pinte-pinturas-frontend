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

export const ListRelatedConstructions = () => {
  const { classes } = useStyles();
  //const navigate = useNavigate();
  const {
    listCollaboratorsRelatedWorks,
    getAllCollaboratorsRelatedWorks,
    pagination,
    handleChangePagination,
  } = useCollaborators();

  useEffect(() => {
    getAllCollaboratorsRelatedWorks();
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
        accessorKey: "relatedWork",
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
    data: listCollaboratorsRelatedWorks,
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
