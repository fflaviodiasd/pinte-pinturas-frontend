import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  Location,
} from "react-router-dom";
import {
  Button,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { KeyboardArrowLeft as KeyboardArrowLeftIcon } from "@mui/icons-material";
import { Formik, Form as FormikForm } from "formik";

import { errorMessage, successMessage } from "../../../components/Messages";
import { TitleScreen } from "../../../components/TitleScreen";
import { InputMask } from "../../../components/InputMask";

import { mockedListCollaborators } from "../../../database/collaborators";
import { inCreationOrEditing, returnedTitlePage } from "../../../utils";
import { Collaborator } from "../../../types";

import { useStyles } from "./styles";

export const FormCollaborators = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { id } = useParams();

  const [collaboratorData, setCollaboratorData] = useState<Collaborator>({
    id: 0,
    name: "",
    type: "",
    status: true,
  });

  const addCollaborator = async (collaboratorData: Collaborator) => {
    try {
      setTimeout(() => {
        navigate("/colaboradores");
        successMessage("Colaborador adicionado com sucesso!");
      }, 1500);
    } catch (error) {
      errorMessage("Não foi possível adicionar colaborador!");
    }
  };

  const updateCollaborator = async (collaboratorData: Collaborator) => {
    try {
      setTimeout(() => {
        navigate("/colaboradores");
        successMessage("Colaborador atualizado com sucesso!");
      }, 1500);
    } catch (error) {
      errorMessage("Não foi possível atualizar colaborador!");
    }
  };

  useEffect(() => {
    if (id) {
      let listCollaboratorsCopy = [...mockedListCollaborators];
      listCollaboratorsCopy = listCollaboratorsCopy.filter(
        (race) => race.id === Number(id)
      );
      setCollaboratorData({
        id: listCollaboratorsCopy[0].id,
        name: listCollaboratorsCopy[0].name,
        type: listCollaboratorsCopy[0].type,
        status: listCollaboratorsCopy[0].status,
      });
    }
  }, [id]);

  return (
    <Formik
      enableReinitialize
      initialValues={collaboratorData}
      onSubmit={(values) => {
        if (location.pathname.includes("new")) {
          addCollaborator(values);
        } else {
          updateCollaborator(values);
        }
      }}
    >
      {({ handleChange, values }) => (
        <FormikForm>
          <Grid container spacing={2}>
            <TitleScreen title="Colaboradores" />

            <Grid item xs={12} lg={12}>
              <Paper className={classes.paper}>
                <div className={classes.actionBar}>
                  <div className={classes.actionBarLeftContent}>
                    <IconButton
                      onClick={() => navigate("/colaboradores")}
                      className={classes.buttonBack}
                    >
                      <KeyboardArrowLeftIcon fontSize="medium" />
                    </IconButton>
                    <Typography className={classes.pageSubtitle}>
                      {returnedTitlePage(location, "Colaborador")}
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: inCreationOrEditing(location) ? "flex" : "none",
                    }}
                  >
                    <Button type="submit" className={classes.buttonSave}>
                      Salvar
                    </Button>
                  </div>
                  <div
                    style={{
                      display: inCreationOrEditing(location) ? "none" : "flex",
                    }}
                  >
                    <Button
                      className={classes.buttonSave}
                      onClick={() => navigate(`/colaboradores/${id}/editar`)}
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={12}>
                    <Typography className={classes.formSectionTitle}>
                      Dados
                    </Typography>
                  </Grid>

                  {values.id ? (
                    <Grid item xs={12} lg={3}>
                      <InputLabel className={classes.inputLabel}>ID</InputLabel>
                      <TextField
                        name="id"
                        value={values.id}
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled
                      />
                    </Grid>
                  ) : null}
                  <Grid item xs={12} lg={3}>
                    <InputLabel className={classes.inputLabel}>
                      Nome*
                    </InputLabel>
                    <TextField
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Nome*"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      disabled={!inCreationOrEditing(location)}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <InputLabel className={classes.inputLabel}>
                      Tipo*
                    </InputLabel>
                    <TextField
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                      placeholder="Tipo*"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      disabled={!inCreationOrEditing(location)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};
