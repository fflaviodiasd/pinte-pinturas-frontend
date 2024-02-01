import { ReactElement, forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useStyles } from "./styles";
import { Warning } from "@mui/icons-material";

type ModalDisableProps = {
  modalOpen: boolean;
  handleClose: () => void;
  handleDisable: () => void;
};

export const ModalDisable = ({
  modalOpen,
  handleClose,
  handleDisable,
}: ModalDisableProps) => {
  const { classes } = useStyles();

  return (
    <Dialog
      open={modalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogContent className={classes.dialogContent}>
        <Warning sx={{ color: "#FF9800" }} />
        <Typography sx={{ color: "#FF9800", fontWeight: "bold" }}>
          Atenção
        </Typography>
        <DialogContentText className={classes.dialogContentText}>
          Tem certeza que
        </DialogContentText>
        <DialogContentText className={classes.dialogContentText}>
          deseja apagar?
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={handleClose} variant="outlined">
          <Typography style={{ textTransform: "capitalize" }}>
            Cancelar
          </Typography>
        </Button>
        <Button onClick={handleDisable} variant="contained">
          <Typography style={{ textTransform: "capitalize" }}>
            Apagar
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
