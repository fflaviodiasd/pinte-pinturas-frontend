/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Chip, Grid, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { useCollaborators } from "../../../hooks/useCollaborators";

import { EmptyTableText } from "../../../components/Table/EmptyTableText";
import { BackgroundAvatar } from "../../../components/BackgroundAvatar";
import { TablePagination } from "../../../components/Table/Pagination";
import { ModalDisable } from "../../../components/Table/ModalDisable";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { EditIcon } from "../../../components/EditIcon";

import { useStyles } from "./styles";

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
    <Grid container>
      <Grid item sm={12} md={12} lg={12} className={classes.headerContainer}>
        <Breadcrumb breadcrumbPath1="Funcionários" breadcrumbPath2="Listagem" />

        <Typography className={classes.title}>Funcionários</Typography>
      </Grid>

      <Grid item xs={12} lg={12} className={classes.tableContainer}>
        <MaterialReactTable table={table} />
        {Boolean(listCollaborators.length) && (
          <TablePagination
            count={pagination.pageQuantity}
            page={pagination.currentPage}
            onChange={handleChangePagination}
          />
        )}
      </Grid>

      <ModalDisable
        modalOpen={modalOpen}
        handleCloseModal={handleClose}
        handleDisable={handleDisable}
        selectedName={selectedCollaboratorName}
      />
    </Grid>
  );
};
