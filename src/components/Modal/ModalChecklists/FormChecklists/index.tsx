import { Box, Button, DialogContent, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { SelectComponent } from "../../../Select";
import { useParams } from "react-router-dom";
import { SelectChecklists } from "../SelectChecklists";
import { useConstructions } from "../../../../hooks/useConstructions";
import { useEffect } from "react";

export const FormChecklists = ({ checklistId }: any) => {
  const { id } = useParams();
  const { updateChecklist, getChecklists, constructionData } =
    useConstructions();

  const handleSubmit = async (values: any) => {
    await updateChecklist(values, checklistId);
  };

  useEffect(() => {
    if (checklistId) {
      getChecklists(checklistId);
    }
  }, [checklistId]);

  return (
    <div>
      <Box>
        <Formik
          initialValues={constructionData}
          onSubmit={handleSubmit}
          enableReinitialize={true}
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
                    {({ field, form }: any) => (
                      <TextField
                        {...field}
                        label="Nº"
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputLabelProps={{
                          shrink: !!form.values.number,
                        }}
                      />
                    )}
                  </Field>
                  <Field name="checklistName">
                    {({ field, form }: any) => (
                      <TextField
                        {...field}
                        label="Nome do Checklist"
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputLabelProps={{
                          shrink: !!form.values.checklistName,
                        }}
                      />
                    )}
                  </Field>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Open Sans",
                      fontWeight: 600,
                    }}
                  >
                    Salvar
                  </Button>
                </div>
              </DialogContent>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};