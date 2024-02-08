import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DialogActions, TextField } from "@mui/material";
import { useStyles } from "./styles";
import { Field } from "formik";

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
          <Box>
            <TextField
              name="name"
              label="Nome "
              variant="outlined"
              size="small"
              fullWidth
              required
            />

            <TextField
              name="groups"
              label="Grupos"
              variant="outlined"
              size="small"
              fullWidth
              required
            />

            <TextField
              name="expectedConsumption"
              label="Consumo Esperado"
              variant="outlined"
              size="small"
              fullWidth
              required
            />

            <TextField
              name="unit"
              label="Unidade"
              variant="outlined"
              size="small"
              fullWidth
              required
            />

            <TextField
              name="applicationType"
              label="Tipo de aplicação"
              variant="outlined"
              size="small"
              fullWidth
              required
            />
          </Box>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              <Typography style={{ textTransform: "capitalize" }}>
                Cancelar
              </Typography>
            </Button>
            <Button variant="contained">
              <Typography style={{ textTransform: "capitalize" }}>
                Cadastrar
              </Typography>
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
