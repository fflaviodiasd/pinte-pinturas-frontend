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
};

export const ModalChecklists = ({
  modalOpen,
  handleClose,
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
          Local - L0000 | Nome Teste
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
        <AccordionChecklists
          accordionTitle={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#F44336",
                  marginLeft: "5px",
                }}
              />
              1 | Nome Teste
            </div>
          }
        />
        <AccordionChecklists
          accordionTitle={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#F44336",
                  marginLeft: "5px",
                }}
              />
              1 | Nome Teste
            </div>
          }
        />
        <AccordionChecklists
          accordionTitle={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#F44336",
                  marginLeft: "5px",
                }}
              />
              1 | Nome Teste
            </div>
          }
        />
        <AccordionChecklists
          accordionTitle={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#F44336",
                  marginLeft: "5px",
                }}
              />
              1 | Nome Teste
            </div>
          }
        />
        <AccordionChecklists
          accordionTitle={
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#F44336",
                  marginLeft: "5px",
                }}
              />
              1 | Nome Teste
            </div>
          }
        />
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography style={{ textTransform: "capitalize" }}>
              Fechar
            </Typography>
          </Button>
          <Button type="submit" variant="contained">
            <Typography style={{ textTransform: "capitalize" }}>
              Salvar
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
