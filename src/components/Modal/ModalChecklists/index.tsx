import { ReactElement, forwardRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  InputAdornment,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Search } from "@mui/icons-material";
import AccordionChecklists from "./AccordionChecklists";

type ModalChecklistsProps = {
  modalOpen: boolean;
  handleClose: () => void;
  handleDisable?: () => void;
  localId?: any;
};

export const ModalChecklists = ({
  modalOpen,
  handleClose,
  localId,
}: ModalChecklistsProps) => {
  return (
    <Dialog
      open={modalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <div style={{ padding: "1rem" }}>
        <span
          style={{ fontFamily: "Open Sans", fontWeight: 600, fontSize: "1rem" }}
        >
          Local | ID: {localId}
        </span>
        <div style={{ paddingTop: "0.5rem" }}>
          <TextField
            type="text"
            //value={searchTerm}
            //onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Pesquisar"}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <AccordionChecklists localId={localId} />
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography style={{ textTransform: "capitalize" }}>
              Fechar
            </Typography>
          </Button>
        </DialogActions>
      </div>
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
