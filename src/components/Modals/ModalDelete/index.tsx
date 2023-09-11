import { useLocation } from "react-router-dom";
import { Button, Typography, Dialog, DialogContent } from "@mui/material";

import { returnedPhraseToModalDelete } from "../../../utils";

import { useStyles } from "./styles";

type ModalDeleteProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  deleteFunction: () => void;
};

export const ModalDelete = ({
  isModalOpen,
  closeModal,
  deleteFunction,
}: ModalDeleteProps) => {
  const { classes } = useStyles();
  const location = useLocation();

  return (
    <Dialog open={isModalOpen} onClose={closeModal}>
      <DialogContent style={{ marginLeft: 12, marginRight: 12 }}>
        <div>
          <Typography style={{ fontSize: 24, textAlign: "center" }}>
            Deseja realmente <strong>excluir</strong>
            <br /> este {returnedPhraseToModalDelete(location)}?
          </Typography>
        </div>
      </DialogContent>
      <DialogContent
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 12,
          marginRight: 12,
          paddingBottom: 24,
        }}
      >
        <Button className={classes.buttonBack} onClick={closeModal}>
          Voltar
        </Button>
        <Button
          className={classes.buttonDelete}
          variant="text"
          onClick={() => {
            deleteFunction();
            closeModal();
          }}
        >
          Excluir
        </Button>
      </DialogContent>
    </Dialog>
  );
};
