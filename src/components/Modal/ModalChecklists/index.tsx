import { ReactElement, forwardRef, useEffect, useState } from "react";
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
import { api } from "../../../services/api";

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
  const [area, setArea] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`areas/${localId}/checklist`);
        const data = response.data.area;
        setArea(data);
      } catch (error) {
        console.error("Erro ao buscar dados do backend:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Dialog
      open={modalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        style: {
          width: "60%",
          maxWidth: "none"
        }
      }}
    >
      <div style={{ padding: "1rem" }}>
        <span
          style={{ fontFamily: "Open Sans", fontWeight: 600, fontSize: "1rem" }}
        >
          {area}
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
