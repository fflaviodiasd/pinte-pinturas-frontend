import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";

type ModalUpdateMainSupervisorProps = {
  open: boolean;
  onClose: () => void;
  handleConfirmUpdate: () => void;
  oldSupervisor: string;
  newSupervisor: string;
};

export const ModalUpdateMainSupervisor = ({
  newSupervisor,
  oldSupervisor,
  open,
  onClose,
  handleConfirmUpdate,
}: ModalUpdateMainSupervisorProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          width: "fit-content",
          maxWidth: "400px",
          borderRadius: 8,
        },
      }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", color: "#FF9B1B" }}
      >
        <WarningIcon sx={{ color: "#FF9B1B", marginRight: 1 }} />
        <Typography variant="h6" component="span" sx={{ fontWeight: "bold" }}>
          Atenção
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Já existe um encarregado principal selecionado, deseja substituir
          <strong> {oldSupervisor} </strong> por
          <strong> {newSupervisor}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: "primary.main",
            textTransform: "none",
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleConfirmUpdate}
          color="primary"
          variant="contained"
          sx={{
            textTransform: "none",
          }}
        >
          Substituir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
