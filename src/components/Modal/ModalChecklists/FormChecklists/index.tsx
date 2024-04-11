import { Box, DialogContent, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { SelectComponent } from "../../../Select";
import { useParams } from "react-router-dom";
import { SelectChecklists } from "../SelectChecklists";

export const FormChecklists = () => {
  const { id } = useParams();

  const handleSubmit = async () => {
    console.log("submit");
  };

  return (
    <div>
      <Box>
        <Formik
          initialValues={{
            team: "",
            measurement: "",
            package: "",
            number: "",
            checklistName: "",
          }}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <DialogContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", gap: "1rem" }}>
                  <SelectChecklists
                    name="team"
                    label="Equipe"
                    endpoint={`/constructions/${id}/teams/`}
                    optionKey="id"
                    optionValueKey="id"
                    optionLabelKey="name"
                  />
                  <SelectComponent
                    name="measurement"
                    label="Medição"
                    endpoint={`/constructions/${id}/measurements/`}
                    optionKey="id"
                    optionValueKey="id"
                    optionLabelKey="name"
                  />
                  <SelectChecklists
                    name="package"
                    label="Pacote"
                    endpoint={`/constructions/${id}/packages/`}
                    optionKey="id"
                    optionValueKey="id"
                    optionLabelKey="name"
                  />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Field name="number">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Nº"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    )}
                  </Field>
                  <Field name="checklistName">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Nome do Checklist"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    )}
                  </Field>
                </div>
              </DialogContent>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};
