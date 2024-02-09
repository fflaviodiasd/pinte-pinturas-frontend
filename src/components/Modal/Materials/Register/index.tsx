import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DialogActions, TextField } from "@mui/material";
import { useStyles } from "./styles";
import { Field, Form, Formik } from "formik"; // Importando Formik e Field
import { useMaterials } from "../../../../hooks/useMaterials";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export function ModalRegisterMaterial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { classes } = useStyles();

  const { addMaterial } = useMaterials();

  const handleSubmit = async (values: any) => {
    await addMaterial(values);
    handleClose();
  };

  return (
    <div>
      <Button
        sx={{
          textTransform: "capitalize",
          backgroundColor: "#0076BE",
          color: "#FFFFFF",
          fontFamily: "Open Sans",
          fontWeight: 600,
          fontSize: "1rem",
          padding: "0.5rem 1rem",
          "&:hover": {
            backgroundColor: "#0076BE",
          },
        }}
        onClick={handleOpen}
      >
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
                <Field name="group">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Grupos"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  )}
                </Field>
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
                <Field name="unit">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Unidade"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  )}
                </Field>
                <Field name="applicationType">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Unidade"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  )}
                </Field>
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
