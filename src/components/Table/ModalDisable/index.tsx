import { ReactElement, forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  selectedDisableName?: string;
};

export const ModalDisable = ({
  modalOpen,
  handleClose,
  handleDisable,
  selectedDisableName,
}: ModalDisableProps) => {
  const { classes } = useStyles();

  return (
    <Dialog
      open={modalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle className={classes.successTitle}>
        <Warning className={classes.warningTitleIcon} />
        <Typography className={classes.warningTitleText}>Atenção</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.successTitleMessage}>
          Tem certeza que deseja apagar
          <div style={{ fontWeight: 600 }}>{selectedDisableName}?</div>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
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
