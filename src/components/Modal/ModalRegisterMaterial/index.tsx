import { ReactElement, forwardRef, useContext } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useStyles } from "./styles";
import { UserContext } from "../../../contexts/UserContext";
import { useMaterials } from "../../../hooks/useMaterials";
import { Field, Form, Formik } from "formik";
import { SelectComponent } from "../../Select";
import { Delete } from "@mui/icons-material";

type ModalRegisterMaterialProps = {
  modalOpen: boolean;
  handleClose: () => void;
  handleDisable?: () => void;
  mode: "register" | "edit";
  selectedMaterialId?: any;
};

export const ModalRegisterMaterial = ({
  modalOpen,
  handleClose,
  handleDisable,
  mode,
  selectedMaterialId,
}: ModalRegisterMaterialProps) => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);

  const { addMaterial, updateMaterial } = useMaterials();

  const handleSubmit = async (values: any) => {
    if (mode === "register") {
      await addMaterial(values);
    } else {
      await updateMaterial(values, selectedMaterialId);
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
            {mode === "register" ? "Cadastrar Material" : "Editar Material"}
          </Typography>
          <Formik
            initialValues={{
              name: "",
              groups: "",
              expectedConsumption: "",
              unit: "",
              applicationType: "",
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  <Field name="name">
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
                  <SelectComponent
                    name="group"
                    label="Grupos"
                    endpoint={`companies/${user.company}/materials_group/`}
                    optionKey="id"
                    optionValueKey="id"
                    optionLabelKey="name"
                  />

                  <Field name="expectedConsumption">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Consumo Esperado"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                      />
                    )}
                  </Field>
                  <SelectComponent
                    name="unit"
                    label="Unidade"
                    endpoint="units"
                    optionKey="id"
                    optionValueKey="id"
                    optionLabelKey="name"
                  />
                  <SelectComponent
                    name="applicationType"
                    label="Tipo de Aplicação"
                    endpoint="types_application"
                    optionKey="id"
                    optionValueKey="id"
                    optionLabelKey="name"
                  />
                </Box>
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
                      {mode === "register" ? "Cadastrar" : "Editar"}
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
