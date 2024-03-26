import { TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useConstructions } from "../../../../hooks/useConstructions";
import { Button } from "../../../../components/Button";

export function FormCreateTeam() {
  const { constructionData, addConstructionTeam } = useConstructions();

  const onSubmit = async (values: any) => {
    await addConstructionTeam(values);
  };

  return (
    <div>
      <Formik
        initialValues={constructionData}
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
            <Button label="Salvar" color="primary" />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
