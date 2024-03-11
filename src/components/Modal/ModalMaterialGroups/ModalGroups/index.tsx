import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useMaterials } from "../../../../hooks/useMaterials";
import { TextField } from "@mui/material";
import { useStyles } from "./styles";
import { ListMaterialGroups } from "../ListGroups";
import { Button } from "../../../Button";

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
      <Button label="Grupos" color="primary" onClick={handleOpen} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>Grupos de Materiais</h2>
          <ListMaterialGroups />
          <div
            style={{
              display: "flex",
              justifyContent: "right",
              marginTop: "1rem",
            }}
          >
            <Button label="Fechar" color="secondary" onClick={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
