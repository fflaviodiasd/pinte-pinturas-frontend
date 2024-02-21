import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useMaterials } from "../../../../hooks/useMaterials";
import { TextField } from "@mui/material";
import { useStyles } from "./styles";
import { ListMaterialGroups } from "./table";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  p: 4,
};

export function ModalMaterialGroups() {
  const [open, setOpen] = React.useState(false);
  const { classes } = useStyles();
  const { listMaterialGroups, getAllMaterialGroups, loading } = useMaterials();

  const handleOpen = () => {
    setOpen(true);
    getAllMaterialGroups();
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button className={classes.registerButton} onClick={handleOpen}>
        Grupos
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Grupos de Materiais</h2>
          <ListMaterialGroups />
          <Button onClick={handleClose} variant="contained">
            <Typography style={{ textTransform: "capitalize" }}>
              Fechar
            </Typography>
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
