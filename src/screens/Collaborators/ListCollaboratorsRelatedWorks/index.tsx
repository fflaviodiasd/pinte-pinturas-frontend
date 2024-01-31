import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { MRT_ColumnDef } from "material-react-table";
import { useDebounce } from "use-debounce";

import { Table } from "../../../components/Table";

import { Grid } from "@mui/material";
import { Collaborator } from "../../../types";
import { useStyles } from "./styles";
import { useCollaborators } from "../../../hooks/useCollaborators";

type CollaboratorsRelatedWorksTableItem = Partial<Collaborator>;

export const ListCollaboratorsRelatedWorks = () => {
  const { classes } = useStyles();

  const navigate = useNavigate();
  const {
    getAllCollaboratorsRelatedWorks,
    listCollaboratorsRelatedWorks,
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
      getAllCollaboratorsRelatedWorks();
    }
  }, [value]);

  const columns = useMemo<MRT_ColumnDef<CollaboratorsRelatedWorksTableItem>[]>(
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
        <Table columns={columns} data={listCollaboratorsRelatedWorks} />
      </Grid>
    </Grid>
  );
};
