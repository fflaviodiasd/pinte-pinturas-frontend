import { useContext, useEffect, useState } from "react";
import { Grid } from "@mui/material";

import { ModalDisable } from "../../../components/Table/ModalDisable";
import {
  TeamsContext,
  TeamsContextProvider,
} from "../../../contexts/TeamsContext";

import { TableTeams } from "./Tables/TableTeams";
import { useStyles } from "./styles";

type SelectedTeam = {
  id: number;
  name: string;
};

export const Teams = () => {
  return (
    <TeamsContextProvider>
      <TeamsComponent />
    </TeamsContextProvider>
  );
};

const TeamsComponent = () => {
  const { classes } = useStyles();
  const {
    disableTeam,

    listTeams,
    getAllTeams,
  } = useContext(TeamsContext);
  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam>({
    id: 0,
    name: "",
  });

  const [modalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllTeams();
  }, []);

  console.log("TeamsComponent", listTeams);


  const handleOpenModal = (selectedTeam: SelectedTeam) => {
    setSelectedTeam(selectedTeam);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDisable = () => {
    disableTeam(selectedTeam.id);
    setIsModalOpen(false);
  };

  return (
    <Grid item lg={12} className={classes.container}>
      <TableTeams listTeams={listTeams} handleOpenModal={handleOpenModal} />

      <ModalDisable
        modalOpen={modalOpen}
        handleDisable={handleDisable}
        handleCloseModal={handleCloseModal}
        selectedName={selectedTeam.name}
      />
    </Grid>
  );
};
