import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useMaterials } from "../../../../hooks/useMaterials";
import { TextField } from "@mui/material";
import { useStyles } from "./styles";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
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
          <Typography variant="h5" gutterBottom>
            Grupos de Materiais
          </Typography>
          {loading ? (
            <Typography>Carregando...</Typography>
          ) : (
            <ul>
              {listMaterialGroups.map((material) => (
                <div key={material.id}>
                  <TextField
                    variant="standard"
                    fullWidth
                    value={material.name}
                  />
                </div>
              ))}
            </ul>
          )}
        </Box>
      </Modal>
    </div>
  );
}
