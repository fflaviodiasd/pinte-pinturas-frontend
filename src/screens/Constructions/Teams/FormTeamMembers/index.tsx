import { TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useConstructions } from "../../../../hooks/useConstructions";
import { useEffect } from "react";

export function FormTeamMembers({ teamId }: any) {
  const { constructionData, getConstructionTeamMember } = useConstructions();

  useEffect(() => {
    if (teamId) {
      getConstructionTeamMember(teamId);
    }
  }, [teamId]);

  return (
    <div>
      <Formik
        initialValues={constructionData}
        onSubmit={async (values) => {
          console.log(values);
        }}
        enableReinitialize={true}
      >
        <Form>
          <Field
            as={TextField}
            name="teamName"
            label="Nome da Equipe"
            variant="outlined"
            fullWidth
          />
        </Form>
      </Formik>
    </div>
  );
}
