import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import { useDebounce } from "use-debounce";

import { Table } from "../../../components/Table";

import { Grid } from "@mui/material";
import { useStyles } from "./styles";
import { useClients } from "../../../hooks/useClients";
import { Client } from "../../../types";

type ClientsEmployeesTableItem = Partial<Client>;

export const ListClientsEmployees = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const {
    getAllClientsEmployees,
    listClientsEmployees,
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
      getAllClientsEmployees();
    }
  }, [value]);

  const columns = useMemo<MRT_ColumnDef<ClientsEmployeesTableItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "status",
        header: "Ativo",
      },
      {
        accessorKey: "fullName",
        header: "Nome Completo",
      },
      {
        accessorKey: "cellPhone",
        header: "Celular",
      },
      {
        accessorKey: "role",
        header: "Cargo",
      },
      {
        accessorKey: "profile",
        header: "Perfil",
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Table columns={columns} data={listClientsEmployees} />
      </Grid>
    </Grid>
  );
};
