import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DialogActions, TextField } from "@mui/material";
import { useStyles } from "./styles";
import { Field, Form, Formik } from "formik";
import { useMaterials } from "../../../../hooks/useMaterials";
import { UserContext } from "../../../../contexts/UserContext";
import { SelectComponent } from "../../../Select";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export function ModalRegisterMaterial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { classes } = useStyles();
  const { user } = React.useContext(UserContext);

  const { addMaterial } = useMaterials();

  const handleSubmit = async (values: any) => {
    await addMaterial(values);
    handleClose();
  };

  return (
    <div>
      <Button className={classes.registerButton} onClick={handleOpen}>
        Cadastrar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Cadastrar Material
          </Typography>
          <Formik
            initialValues={{
              name: "",
              groups: "",
              expectedConsumption: "",
              unit: "",
              applicationType: "",
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Field name="name">
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          label="Nome"
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                        />
                      )}
                    </Field>
                    <SelectComponent
                      name="group"
                      label="Grupos"
                      endpoint={`companies/${user.company}/materials_group/`}
                      optionKey="id"
                      optionValueKey="id"
                      optionLabelKey="name"
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Field name="expectedConsumption">
                      {({ field }: any) => (
                        <TextField
                          {...field}
                          label="Consumo Esperado"
                          variant="outlined"
                          size="small"
                          fullWidth
                          required
                        />
                      )}
                    </Field>
                    <SelectComponent
                      name="unit"
                      label="Unidade"
                      endpoint="units"
                      optionKey="id"
                      optionValueKey="id"
                      optionLabelKey="name"
                    />
                    <SelectComponent
                      name="applicationType"
                      label="Tipo de Aplicação"
                      endpoint="types_application"
                      optionKey="id"
                      optionValueKey="id"
                      optionLabelKey="name"
                    />
                  </Box>
                </Box>
                <DialogActions>
                  <Button onClick={handleClose} variant="outlined">
                    <Typography style={{ textTransform: "capitalize" }}>
                      Cancelar
                    </Typography>
                  </Button>
                  <Button type="submit" variant="contained">
                    <Typography style={{ textTransform: "capitalize" }}>
                      Cadastrar
                    </Typography>
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
