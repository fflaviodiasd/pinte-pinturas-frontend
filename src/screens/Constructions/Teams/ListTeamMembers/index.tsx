/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Grid, TextField, Autocomplete } from "@mui/material";
import { Field, Form, Formik } from "formik";

import { useTeams } from "../../../../hooks/useTeams";
import { api } from "../../../../services/api";

import { Button } from "../../../../components/Button";
import { TableMembers } from "../Tables/TableMembers";

import { GroupHeader, GroupItems } from "./styles";

type ListTeamMembers = {
  teamId: number;
};

type Option = {
  id: number;
  firstLetter: string;
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
  const {
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

  const [options, setOptions] = useState<Option[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Option[]>([]);

  const currentMembersIds = listTeamMembers.map(
    (selectedMember) => selectedMember.id
  );

  const currentOptions = options.filter(
    (option) => !currentMembersIds.includes(option.id)
  );

  const getOptionsTeamMembers = async () => {
    try {
      const { data } = await api.get<Option[]>(
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

  const returnedOptions = (option: Option) => {
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1rem",
                }}
              >
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
            </div>

            <TableMembers listTeamMembers={listTeamMembers} />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button label="Salvar" color="primary" />
            </div>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  );
};
