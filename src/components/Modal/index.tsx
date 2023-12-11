import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";

import { useStyles } from "./styles";

type ModalProps = {
  type: "success" | "warning";
  isModalOpen: boolean;
  closeModal: () => void;
  closeButtonText?: string;
};

export const Modal = ({
  type,
  isModalOpen,
  closeModal,
  closeButtonText = "Fechar",
}: ModalProps) => {
  const { classes } = useStyles();

  if (type === "success") {
    return (
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle className={classes.successTitle}>
          <CheckCircleIcon className={classes.successTitleIcon} />
          <Typography className={classes.successTitleText}>Sucesso</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.successTitleMessage}>
            Enviamos instruções de redefinição de
            <br />
            senha para o e-mail informado.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button className={classes.buttonBack} onClick={closeModal}>
            <Typography className={classes.buttonBackText}>
              {closeButtonText}
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return (
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle className={classes.successTitle}>
          <WarningIcon className={classes.warningTitleIcon} />
          <Typography className={classes.warningTitleText}>
            Link expirado
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.successTitleMessage}>
            É necessário realizar uma nova
            <br />
            redefinição de senha, para receber um
            <br />
            novo link no seu e-mail.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button className={classes.buttonBack} onClick={closeModal}>
            <Typography className={classes.buttonBackText}>
              {closeButtonText}
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};
