import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Grid, useTheme } from "@mui/material";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { TablePagination } from "../../../components/Table/Pagination";
import { useCollaborators } from "../../../hooks/useCollaborators";

export const ListCollaboratorsHistory = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    listCollaboratorsHistory,
    getAllCollaboratorsHistory,
    pagination,
    handleChangePagination,
  } = useCollaborators();
  const theme = useTheme();

  const [selectedCollaboratorHistoryId, setselectedCollaboratorHistoryId] =
    useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  //light or dark green
  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

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
        {Boolean(listCollaboratorsHistory.length) && (
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
