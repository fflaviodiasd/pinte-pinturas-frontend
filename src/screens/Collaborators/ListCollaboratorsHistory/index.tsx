import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import { useDebounce } from "use-debounce";

import { Table } from "../../../components/Table";

import { Grid } from "@mui/material";
import { useStyles } from "./styles";
import { Client } from "../../../types";
import { useCollaborators } from "../../../hooks/useCollaborators";

type ClientsRelatedWorksTableItem = Partial<Client>;

export const ListClientsHistory = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const {
    getAllCollaboratorsHistory,
    listCollaboratorsHistory,
    disableCollaborator,
    getCollaboratorBySearch,
    pagination,
    handleChangePagination,
  } = useCollaborators();

  const [selectedClientId, setselectedClientId] = useState<number>(0);
  const [modalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableCollaborator(selectedClientId);
    setIsModalOpen(false);
  };

  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);

  useEffect(() => {
    if (value) {
      getCollaboratorBySearch(value);
    } else {
      getAllCollaboratorsHistory();
    }
  }, [value]);

  const columns = useMemo<MRT_ColumnDef<ClientsRelatedWorksTableItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "role",
        header: "Cargo",
      },
      {
        accessorKey: "dismissalDate",
        header: "Data de Demissão",
      },
      {
        accessorKey: "salary",
        header: "Salário",
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Table columns={columns} data={listCollaboratorsHistory} />
      </Grid>
    </Grid>
  );
};
