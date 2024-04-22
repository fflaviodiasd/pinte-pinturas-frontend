import { useEffect, useMemo, useState } from "react";

import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { Grid, Paper, useTheme } from "@mui/material";
import { useClients } from "../../../hooks/useClients";

import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "../../../components/EditIcon";
import { TablePagination } from "../../../components/Table/Pagination";
import { ModalDisable } from "../../../components/Table/ModalDisable";
import { Delete } from "@mui/icons-material";
import { BackgroundAvatar } from "../../../components/Avatar";
import { Navbar } from "../../../components/Navbar";

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
  const theme = useTheme();

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

  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#FFFFFF";

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
      <Navbar title="Clientes" />

      <Grid item xs={12} lg={12}>
        <MaterialReactTable table={table} />
        {Boolean(listClients.length) && (
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
          selectedDisableName={selectedTradingName}
        />
      </Grid>
    </Grid>
  );
};
