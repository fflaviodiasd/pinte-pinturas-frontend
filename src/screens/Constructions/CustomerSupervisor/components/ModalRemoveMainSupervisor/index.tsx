import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Warning as WarningIcon } from "@mui/icons-material";

type ModalRemoveMainSupervisorProps = {
  open: boolean;
  onClose: () => void;
  oldSupervisor: string;
  handleDeleteSupervisor: () => void;
};

export const ModalRemoveMainSupervisor = ({
  open,
  onClose,
  oldSupervisor,
  handleDeleteSupervisor,
}: ModalRemoveMainSupervisorProps) => {
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
          Deseja remover o encarregado principal
          <strong> {oldSupervisor}</strong>?
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
          onClick={handleDeleteSupervisor}
          color="primary"
          variant="contained"
          sx={{
            textTransform: "none",
          }}
        >
          Remover
        </Button>
      </DialogActions>
    </Dialog>
  );
};
