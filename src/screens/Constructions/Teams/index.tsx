import { useContext, useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";

import { ModalDisable } from "../../../components/Table/ModalDisable";
import {
  TeamsContext,
  TeamsContextProvider,
} from "../../../contexts/TeamsContext";
import { Button } from "../../../components/Button";

import { TableTeams } from "./Tables/TableTeams";

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
  const { disableTeam, addTeam, listTeams, getAllTeams } =
    useContext(TeamsContext);
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

  const handleAddTeam = async (name: string) => {
    addTeam(name);
    setShowAddTeamInput(false);
  };

  return (
    <Grid container>
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

        <TableTeams listTeams={listTeams} handleOpenModal={handleOpenModal} />

        <ModalDisable
          modalOpen={modalOpen}
          handleDisable={handleDisable}
          handleCloseModal={handleCloseModal}
          selectedName={selectedTeam.name}
        />
      </Grid>
    </Grid>
  );
};
