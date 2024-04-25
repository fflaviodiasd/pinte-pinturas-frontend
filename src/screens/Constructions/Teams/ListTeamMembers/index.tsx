/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Autocomplete,
  Button as MuiButton,
  CircularProgress,
} from "@mui/material";
import { Field, Form, Formik } from "formik";

import { useTeams } from "../../../../hooks/useTeams";
import { api } from "../../../../services/api";

import { QuantityRowsText } from "../../../../components/QuantityRowsText";
import { Button } from "../../../../components/Button";

import { TableMembers } from "../Tables/TableMembers";

import { ButtonsContainer, GroupHeader, GroupItems, useStyles } from "./styles";

type ListTeamMembers = {
  teamId: number;
};

type TeamMember = {
  id: number;
  firstLetter: string;
  avatar: string;
  active: boolean;
  name: string;
  office: string;
  profile: string;
  cell_phone: string;
};

type FormUpdateTeamMembers = {
  teamName: string;
};

export const ListTeamMembers = ({ teamId }: ListTeamMembers) => {
  const { classes } = useStyles();
  const {
    loading,
    listTeamMembers,
    getTeam,
    updateTeamMembers,
    getAllTeamMembers,
    teamData,
  } = useTeams();

  useEffect(() => {
    if (teamId) {
      getAllTeamMembers(teamId);
    }
  }, [teamId]);

  const [options, setOptions] = useState<TeamMember[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);

  const currentMembersIds = listTeamMembers.map(
    (selectedMember) => selectedMember.id
  );

  const currentOptions = options.filter(
    (option) => !currentMembersIds.includes(option.id)
  );

  const getOptionsTeamMembers = async () => {
    try {
      const { data } = await api.get<TeamMember[]>(
        `teams/${teamId}/select_members`
      );

      setOptions(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    getOptionsTeamMembers();
  }, []);

  useEffect(() => {
    if (teamId) {
      getTeam(teamId);
    }
  }, [teamId]);

  const handleUpdateTeamMembers = ({ teamName }: FormUpdateTeamMembers) => {
    updateTeamMembers(selectedMembers, teamName, teamId);
    setSelectedMembers([]);
  };

  const returnedOptions = (option: TeamMember) => {
    return `${option.active ? "Ativo" : "Inativo"} - ${option.name} - ${
      option.office
    }`;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={12}>
        <Formik
          initialValues={{ teamName: teamData.teamName }}
          onSubmit={(values) => handleUpdateTeamMembers(values)}
          enableReinitialize={true}
        >
          <Form>
            <div className={classes.inputsContainer}>
              <Field
                as={TextField}
                name="teamName"
                label="Nome da Equipe"
                variant="outlined"
                sx={{ width: "50%" }}
              />

              <Autocomplete
                id="grouped-demo"
                value={selectedMembers}
                options={currentOptions.sort((a, b) =>
                  a.name.localeCompare(b.name)
                )}
                groupBy={(option) => option.name.charAt(0).toUpperCase()}
                getOptionLabel={(option) => returnedOptions(option)}
                onChange={(_, newValue) => setSelectedMembers(newValue)}
                multiple
                fullWidth
                filterSelectedOptions
                renderGroup={(params) => {
                  return (
                    <li>
                      <GroupHeader>{params.group}</GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Adicionar colaborador por nome, matricula ou perfil"
                  />
                )}
              />
            </div>

            {loading ? (
              <div className={classes.loadingContainer}>
                <CircularProgress size={32} />
              </div>
            ) : (
              <>
                <TableMembers listTeamMembers={listTeamMembers} />

                <QuantityRowsText quantityRows={listTeamMembers.length} />

                <ButtonsContainer>
                  <MuiButton
                    className={classes.cancelButton}
                    onClick={() => {
                      setSelectedMembers([]);
                    }}
                  >
                    Cancelar
                  </MuiButton>
                  <Button label="Salvar" color="primary" />
                </ButtonsContainer>
              </>
            )}
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};
