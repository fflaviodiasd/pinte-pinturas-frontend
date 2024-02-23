import { ReactElement, forwardRef, useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useStyles } from "./styles";
import { UserContext } from "../../../contexts/UserContext";
import { Field, Form, Formik } from "formik";
import { Delete } from "@mui/icons-material";
import { useConstructions } from "../../../hooks/useConstructions";

type ModalRegisterConstructionMaterialProps = {
  modalOpen: boolean;
  handleClose: () => void;
  handleDisable?: () => void;
  mode: "register" | "edit";
  selectedConstructionMaterialId?: any;
};

export const ModalRegisterConstructionMaterial = ({
  modalOpen,
  handleClose,
  handleDisable,
  mode,
  selectedConstructionMaterialId,
}: ModalRegisterConstructionMaterialProps) => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);

  const { addConstructionMaterial, updateConstructionMaterial } =
    useConstructions();

  const handleSubmit = async (values: any) => {
    if (mode === "register") {
      await addConstructionMaterial(values);
    } else {
      await updateConstructionMaterial(values, selectedConstructionMaterialId);
    }
    handleClose();
  };

  return (
    <Dialog
      open={modalOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogContent>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {mode === "register"
              ? "Adicionar Material da Obra"
              : "Edição Material da Obra"}
          </Typography>
          <Formik
            initialValues={{
              material: "",
              groups: "",
              productionBatch: "",
              price: "",
              expirationDate: "",
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <DialogContent>
                  <Field name="material">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Nome"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                      />
                    )}
                  </Field>
                  <Field name="groups">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Grupos"
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                      />
                    )}
                  </Field>
                  <Field name="productionBatch">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Lote"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                      />
                    )}
                  </Field>
                  <Field name="price">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Preço"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                      />
                    )}
                  </Field>
                  <Field name="expirationDate">
                    {({ field }: any) => (
                      <TextField
                        sx={{ marginTop: "0.5rem" }}
                        {...field}
                        label="Data Validade"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  </Field>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDisable}>
                    {mode === "edit" ? (
                      <Delete sx={{ color: "red", cursor: "pointer" }} />
                    ) : null}
                  </Button>
                  <Button onClick={handleClose} variant="outlined">
                    <Typography style={{ textTransform: "capitalize" }}>
                      Cancelar
                    </Typography>
                  </Button>
                  <Button type="submit" variant="contained">
                    <Typography style={{ textTransform: "capitalize" }}>
                      {mode === "register" ? "Adicionar" : "Salvar"}
                    </Typography>
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Box>
      </DialogContent>
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
