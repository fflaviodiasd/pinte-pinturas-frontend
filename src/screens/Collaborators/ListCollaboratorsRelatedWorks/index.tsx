import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Chip, Grid, useTheme } from "@mui/material";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "../../../components/Table/Pagination";
import { useCollaborators } from "../../../hooks/useCollaborators";

export const ListCollaboratorsRelatedWorks = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    listCollaboratorsRelatedWorks,
    getAllCollaboratorsRelatedWorks,
    pagination,
    handleChangePagination,
  } = useCollaborators();
  const theme = useTheme();

  const [
    selectedCollaboratorRelatedWorksId,
    setselectedCollaboratorRelatedWorksId,
  ] = useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  //light or dark green
  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

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
        {Boolean(listCollaboratorsRelatedWorks.length) && (
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
