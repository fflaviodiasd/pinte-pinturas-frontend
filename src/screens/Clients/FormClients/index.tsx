/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  // Location,
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

import { mockedListClients } from "../../../database/clients";
import { inCreationOrEditing, returnedTitlePage } from "../../../utils";
import { Client } from "../../../types";

import { useStyles } from "./styles";

export const FormClients = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { id } = useParams();

  const [clientData, setClientData] = useState<Client>({
    id: 0,
    name: "",
    cnpj: "",
    status: true,
  });

  const addClient = async (clientData: Client) => {
    try {
      setTimeout(() => {
        navigate("/clientes");
        successMessage("Cliente adicionado com sucesso!");
      }, 1500);
    } catch (error) {
      errorMessage("Não foi possível adicionar cliente!");
    }
  };

  const updateClient = async (clientData: Client) => {
    try {
      setTimeout(() => {
        navigate("/clientes");
        successMessage("Cliente atualizado com sucesso!");
      }, 1500);
    } catch (error) {
      errorMessage("Não foi possível atualizar cliente!");
    }
  };

  useEffect(() => {
    if (id) {
      let listClientsCopy = [...mockedListClients];
      listClientsCopy = listClientsCopy.filter(
        (race) => race.id === Number(id)
      );
      setClientData({
        id: listClientsCopy[0].id,
        name: listClientsCopy[0].name,
        cnpj: listClientsCopy[0].cnpj,
        status: listClientsCopy[0].status,
      });
    }
  }, [id]);

  return (
    <Formik
      enableReinitialize
      initialValues={clientData}
      onSubmit={(values) => {
        if (location.pathname.includes("new")) {
          addClient(values);
        } else {
          updateClient(values);
        }
      }}
    >
      {({ handleChange, values }) => (
        <FormikForm>
          <Grid container spacing={2}>
            <TitleScreen title="Clientes" />

            <Grid item xs={12} lg={12}>
              <Paper className={classes.paper}>
                <div className={classes.actionBar}>
                  <div className={classes.actionBarLeftContent}>
                    <IconButton
                      onClick={() => navigate("/clientes")}
                      className={classes.buttonBack}
                    >
                      <KeyboardArrowLeftIcon fontSize="medium" />
                    </IconButton>
                    <Typography className={classes.pageSubtitle}>
                      {returnedTitlePage(location, "Cliente")}
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
                      onClick={() => navigate(`/clientes/${id}/editar`)}
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
                      CNPJ*
                    </InputLabel>
                    <TextField
                      name="cnpj"
                      value={values.cnpj}
                      onChange={handleChange}
                      placeholder="Tipo*"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      disabled={!inCreationOrEditing(location)}
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
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
