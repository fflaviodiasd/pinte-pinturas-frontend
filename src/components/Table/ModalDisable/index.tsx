import { ReactElement, forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Warning } from "@mui/icons-material";

import { SelectedName, useStyles } from "./styles";

type ModalDisableProps = {
  modalOpen: boolean;
  handleCloseModal: () => void;
  handleDisable: () => void;
  selectedName?: string;
};

export const ModalDisable = ({
  modalOpen,
  handleCloseModal,
  handleDisable,
  selectedName,
}: ModalDisableProps) => {
  const { classes } = useStyles();

  return (
    <Dialog
      open={modalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
    >
      <DialogTitle className={classes.successTitle}>
        <Warning className={classes.warningTitleIcon} />
        <Typography className={classes.warningTitleText}>Atenção</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.successTitleMessage}>
          Tem certeza que deseja apagar
          <br />
          <SelectedName>{selectedName}?</SelectedName>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>
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
    children: ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
