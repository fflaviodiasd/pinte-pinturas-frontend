import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import { useDebounce } from "use-debounce";

import { Table } from "../../../components/Table";

import { Grid, Paper } from "@mui/material";
import { Client } from "../../../types";
import { EditIcon } from "../../../components/EditIcon";
import { useClients } from "../../../hooks/useClients";
import { TitleScreen } from "../../../components/TitleScreen";
import { useStyles } from "./styles";
import { TablePagination } from "../../../components/Table/Pagination";

type ClientsTableItem = Partial<Client>;

export const ListClients = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const {
    getAllClients,
    listClients,
    disableClient,
    getClientBySearch,
    pagination,
    handleChangePagination,
  } = useClients();

  const [selectedClientId, setselectedClientId] = useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableClient(selectedClientId);
    setIsModalOpen(false);
  };

  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);

  useEffect(() => {
    if (value) {
      getClientBySearch(value);
    } else {
      getAllClients();
    }
  }, [value]);

  const columns = useMemo<MRT_ColumnDef<ClientsTableItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "tradingName",
        header: "Nome Fantasia",
      },
      {
        accessorKey: "responsible",
        header: "Nome do Responsável",
      },
      {
        accessorKey: "phone",
        header: "Telefone",
      },
      {
        accessorKey: "email",
        header: "E-mail",
      },
      {
        accessorKey: "cnpj",
        header: "CNPJ",
      },

      {
        id: "edit",
        header: "",
        columnDefType: "display",
        muiTableHeadCellProps: {
          align: "right",
        },
        muiTableBodyCellProps: {
          align: "right",
        },
        Cell: ({ cell }) => (
          <EditIcon
            onClick={() => navigate(`/clientes/${cell.row.original.id}`)}
            label="Editar"
          />
        ),
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Paper className={classes.paper}>
          <div className={classes.searchBarContainer}>
            <TitleScreen title="Clientes" />
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={12}>
        <Table columns={columns} data={listClients} />
        {Boolean(listClients.length) && (
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
