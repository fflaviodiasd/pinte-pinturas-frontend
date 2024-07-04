import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface Supervisor {
  id: number;
  name: string;
}

type ModalAddMainSupervisorProps = {
  open: boolean;
  onClose: () => void;
  handleConfirmAddSupervisor: () => void;
  handleSelectSupervisor: (
    event: React.ChangeEvent<HTMLInputElement>,
    supervisor?: Supervisor
  ) => void;
  companiesSupervisorList: {
    id: number;
    name: string;
  }[];
  selectedSupervisor: string;
};

export const ModalAddMainSupervisor = ({
  open,
  onClose,
  handleConfirmAddSupervisor,
  handleSelectSupervisor,
  companiesSupervisorList,
  selectedSupervisor,
}: ModalAddMainSupervisorProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Adicionar Encarregado</DialogTitle>
      <DialogContent dividers={true}>
        <RadioGroup
          value={selectedSupervisor}
          onChange={(event) =>
            handleSelectSupervisor(
              event,
              companiesSupervisorList.find(
                (sup: Supervisor) => sup.id.toString() === event.target.value
              )
            )
          }
        >
          {companiesSupervisorList.map((supervisor: Supervisor) => (
            <FormControlLabel
              key={supervisor.id}
              value={supervisor.id.toString()}
              control={<Radio />}
              label={supervisor.name}
            />
          ))}
        </RadioGroup>
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
          onClick={handleConfirmAddSupervisor}
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
          }}
        >
          Adicionar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
