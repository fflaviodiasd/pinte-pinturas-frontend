import { useEffect, useState } from "react";
import { Box, Grid, Tooltip, Typography, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

import { Field, Form, Formik } from "formik";

import { useTeams } from "../../../hooks/useTeams";

import { ModalDisable } from "../../../components/Table/ModalDisable";
import { Button } from "../../../components/Button";

import { TableTeams } from "./Tables/TableTeams";

import { useStyles } from "./styles";

type SelectedTeam = {
  id: number;
  name: string;
};

export const Teams = () => {
  const { classes } = useStyles();
  const { disableTeam, addTeam, listTeams, getAllTeams } = useTeams();

  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam>({
    id: 0,
    name: "",
  });

  const [showAddTeamInput, setShowAddTeamInput] = useState(false);
  const [modalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllTeams();
  }, []);

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

  const handleAddTeam = (name: string) => {
    addTeam(name);
    setShowAddTeamInput(false);
  };

  const handleShowAddTeamInput = () => {
    setShowAddTeamInput(true);
  };

  return (
    <Grid
      container
      // style={{ padding: 16, backgroundColor: "#eff1f3" }}
    >
      <Grid item xs={12} lg={12}>
        {showAddTeamInput && (
          <div style={{ padding: "1.5rem" }}>
            <div>
              <Formik
                initialValues={{ name: "" }}
                onSubmit={(values) => {
                  handleAddTeam(values.name);
                }}
                enableReinitialize={true}
              >
                <Form>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Field
                      as={TextField}
                      name="name"
                      label="Nome da Equipe"
                      variant="outlined"
                      fullWidth
                    />
                    <Button label="Salvar" color="primary" />
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        )}

        <Typography className={classes.teamsTitle}>
          <span className={classes.teamsBorder}>Equip</span>
          es
        </Typography>

        <Box
          sx={{ display: "flex", justifyContent: "right", marginRight: "1rem" }}
        >
          <Button
            label={
              <Tooltip title="Adicionar Equipe">
                <Add />
              </Tooltip>
            }
            color="secondary"
            onClick={handleShowAddTeamInput}
          />
        </Box>

        <TableTeams listTeams={listTeams} handleOpenModal={handleOpenModal} />

        <ModalDisable
          modalOpen={modalOpen}
          handleDisable={handleDisable}
          handleCloseModal={handleCloseModal}
          selectedTeamName={selectedTeam.name}
        />
      </Grid>
    </Grid>
  );
};
