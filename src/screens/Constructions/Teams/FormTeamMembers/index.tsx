import { Button, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useConstructions } from "../../../../hooks/useConstructions";
import { useEffect, useState } from "react";
import AutocompleteCategories from "../../../../components/AutocompleteCategories";

export function FormTeamMembers({ teamId }: any) {
  const [selectedMembers, setSelectedMembers] = useState<any[]>([]);
  const {
    constructionData,
    getConstructionTeamMember,
    updateConstructionTeamMember,
  } = useConstructions();

  const onSubmit = async (values: any) => {
    values.teamMembers = selectedMembers;
    await updateConstructionTeamMember(values, teamId);
  };

  useEffect(() => {
    if (teamId) {
      getConstructionTeamMember(teamId);
    }
  }, [teamId]);

  return (
    <div>
      <Formik
        initialValues={{ ...constructionData, teamId }}
        onSubmit={async (values) => {
          console.log(values);
          onSubmit(values);
        }}
        enableReinitialize={true}
      >
        <Form>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Field
              as={TextField}
              name="teamName"
              label="Nome da Equipe"
              variant="outlined"
              fullWidth
            />
            <AutocompleteCategories
              endpoint={`teams/${teamId}/select_members`}
              name="teamMembers"
              onSelect={(selectedIds: any[]) => setSelectedMembers(selectedIds)}
            />
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
