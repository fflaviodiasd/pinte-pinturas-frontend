/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { Field, Form, Formik } from "formik";

import { useConstructions } from "../../../../hooks/useConstructions";
import { api } from "../../../../services/api";

import { Button } from "../../../../components/Button";

interface Option {
  id: number;
  firstLetter: string;
  active: boolean;
  name: string;
  office: string;
}

export function FormTeamMembers({ teamId }: any) {
  const { constructionData, getConstructionTeamMember, updateTeamMembers } =
    useConstructions();
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Option[]>([]);

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
      getConstructionTeamMember(teamId);
    }
  }, [teamId]);

  const handleUpdateTeamMembers = (values: any) => {
    const membersIds = selectedMembers.map(
      (selectedMember) => selectedMember.id
    );

    updateTeamMembers(membersIds, values.teamName, teamId);
  };

  const returnedOptions = (option: Option) => {
    return `${option.active ? "Ativo" : "Inativo"} - ${option.name} - ${
      option.office
    }`;
  };

  return (
    <div>
      <Formik
        initialValues={{ ...constructionData }}
        onSubmit={(values) => handleUpdateTeamMembers(values)}
        enableReinitialize={true}
      >
        <Form>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Field
              as={TextField}
              name="teamName"
              label="Nome da Equipe"
              variant="outlined"
              sx={{ width: "50%" }}
            />

            <Autocomplete
              id="grouped-demo"
              options={options.sort((a, b) => a.name.localeCompare(b.name))}
              groupBy={(option) => option.name.charAt(0).toUpperCase()}
              getOptionLabel={(option) => returnedOptions(option)}
              onChange={(_, newValue) => setSelectedMembers(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Adicionar colaborador por nome, matricula ou perfil"
                />
              )}
              multiple
              fullWidth
            />

            <Button label="Salvar" color="primary" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
