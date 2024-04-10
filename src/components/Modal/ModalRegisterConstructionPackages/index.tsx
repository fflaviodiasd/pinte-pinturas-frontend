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
  useTheme,
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

export const ModalRegisterConstructionPackages = ({
  modalOpen,
  handleClose,
  handleDisable,
  mode,
  selectedConstructionMaterialId,
}: ModalRegisterConstructionMaterialProps) => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);
  const theme = useTheme(); // Usar o hook useTheme

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
              ? "Adicionar Pacotes da Obra"
              : "Edição Pacotes da Obra"}
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
              <Form >
                <DialogContent>
                <Box marginBottom={theme.spacing(2)}>
                  <Field name="material">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Ordem"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                      />
                    )}
                  </Field>
                  </Box>
                  <Box marginBottom={theme.spacing(2)}>

                  <Field name="groups">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Nome do Pacote"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required

                      />
                    )}
                  </Field>
                  </Box>

                  {/* <Field name="productionBatch">
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
                  </Field> */}
                                  <Box marginBottom={theme.spacing(2)}>

                  <Field name="price">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Disciplina"
                        variant="outlined"
                        size="small"
                        fullWidth

                      />
                    )}
                  </Field>
                  </Box>
{/* 
                  <Box marginBottom={theme.spacing(2)}>

                  <Field name="price">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Medida"
                        variant="outlined"
                        size="small"
                        fullWidth

                      />
                    )}
                  </Field>
                  </Box>

                  <Box marginBottom={theme.spacing(2)}>

                  <Field name="price">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Etapa"
                        variant="outlined"
                        size="small"
                        fullWidth

                      />
                    )}
                  </Field>
                  </Box> */}

                  {/* <Field name="expirationDate">
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
                  </Field> */}
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
