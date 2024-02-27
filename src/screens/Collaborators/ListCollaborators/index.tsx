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
import { ModalDisable } from "../../../components/Table/ModalDisable";
import { Delete } from "@mui/icons-material";
import { BackgroundAvatar } from "../../../components/Avatar";
import { useCollaborators } from "../../../hooks/useCollaborators";

export const ListCollaborators = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    listCollaborators,
    getAllCollaborators,
    disableCollaborator,
    pagination,
    handleChangePagination,
  } = useCollaborators();
  const theme = useTheme();

  const [selectedCollaboratorId, setselectedCollaboratorId] =
    useState<number>(0);
  const [selectedCollaboratorName, setselectedCollaboratorName] =
    useState<string>("");

  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableCollaborator(selectedCollaboratorId);
    setIsModalOpen(false);
  };

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

  useEffect(() => {
    getAllCollaborators();
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
              onClick={() => navigate(`/colaboradores/${cell.row.original.id}`)}
              label="Editar"
            />
            <Delete
              sx={{ cursor: "pointer", color: "#C5C7C8" }}
              onClick={() => {
                setselectedCollaboratorId(cell.row.original.id!);
                setselectedCollaboratorName(cell.row.original.name);

                setIsModalOpen(true);
              }}
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
        header: "Nome",
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
        accessorKey: "cellPhone",
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
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: listCollaborators,
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
            <TitleScreen title="Funcionários" />
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
        {Boolean(listCollaborators.length) && (
          <TablePagination
            count={pagination.pageQuantity}
            page={pagination.currentPage}
            onChange={handleChangePagination}
          />
        )}
        <ModalDisable
          modalOpen={modalOpen}
          handleClose={handleClose}
          handleDisable={handleDisable}
          selectedDisableName={selectedCollaboratorName}
        />
      </Grid>
    </Grid>
  );
};
