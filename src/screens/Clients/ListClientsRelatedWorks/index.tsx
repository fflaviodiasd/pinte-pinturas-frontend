import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import { useDebounce } from "use-debounce";

import { Table } from "../../../components/Table";

import { Grid } from "@mui/material";
import { useStyles } from "./styles";
import { useClients } from "../../../hooks/useClients";
import { Client } from "../../../types";

type ClientsRelatedWorksTableItem = Partial<Client>;

export const ListClientsRelatedWorks = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const {
    getAllClientsRelatedWorks,
    listClientsRelatedWorks,
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
      getAllClientsRelatedWorks();
    }
  }, [value]);

  const columns = useMemo<MRT_ColumnDef<ClientsRelatedWorksTableItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "active",
        header: "Ativa",
      },
      {
        accessorKey: "name",
        header: "Nome da Obra",
      },
      {
        accessorKey: "responsible",
        header: "Responsável",
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Table columns={columns} data={listClientsRelatedWorks} />
      </Grid>
    </Grid>
  );
};
