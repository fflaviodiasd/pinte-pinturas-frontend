/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { EmptyTableText } from "../../../components/Table/EmptyTableText";
import { BackgroundAvatar } from "../../../components/BackgroundAvatar";
import { TablePagination } from "../../../components/Table/Pagination";
import { ModalDisable } from "../../../components/Table/ModalDisable";
import { Breadcrumb } from "../../../components/Breadcrumb";
import { EditIcon } from "../../../components/EditIcon";
import { useClients } from "../../../hooks/useClients";

import { useStyles } from "../styles";

export const ListClients = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const {
    listClients,
    getAllClients,
    disableClient,
    pagination,
    handleChangePagination,
  } = useClients();

  const [selectedClientId, setselectedClientId] = useState<number>(0);
  const [selectedTradingName, setselectedTradingName] = useState<string>("");

  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableClient(selectedClientId);
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllClients();
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
              onClick={() => navigate(`/clientes/${cell.row.original.id}`)}
              label="Editar"
            />
            <Delete
              sx={{ cursor: "pointer", color: "#C5C7C8" }}
              onClick={() => {
                setselectedClientId(cell.row.original.id!);
                setselectedTradingName(cell.row.original.tradingName);

                setIsModalOpen(true);
              }}
            />
          </div>
        ),
      },

      {
        accessorKey: "tradingName",
        enableColumnFilterModes: false,
        filterFn: "startsWith",
        header: "Nome Fantasia",
        Cell: ({ cell }) => (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",

              alignItems: "center",
            }}
          >
            {cell.row.original.tradingName && (
              <BackgroundAvatar avatarName={cell.row.original.tradingName} />
            )}
            {cell.row.original.tradingName}
          </div>
        ),
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
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: { showColumnFilters: true },
    muiFilterTextFieldProps: (props) => {
      return {
        placeholder: `Filtrar por ${props.column.columnDef.header}`,
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
        <Breadcrumb breadcrumbPath1="Clientes" breadcrumbPath2="Listagem" />

        <Typography className={classes.title}>Clientes</Typography>
      </Grid>

      <Grid item xs={12} lg={12} className={classes.tableContainer}>
        <MaterialReactTable table={table} />
        {Boolean(listClients.length) && (
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
        selectedTeamName={selectedTradingName}
      />
    </Grid>
  );
};
