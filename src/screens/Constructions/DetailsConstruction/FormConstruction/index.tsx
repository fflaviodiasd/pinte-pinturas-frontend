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

import { inCreationOrEditing, returnedTitlePage } from "../../../../utils";

import { useConstructions } from "../../../../hooks/useConstructions";
import { mockedListConstructions } from "../../../../database/constructions";

import { useStyles } from "./styles";

export const FormConstruction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { id } = useParams();

  const {
    constructionData,
    addConstruction,
    updateConstruction,
    getConstruction,
  } = useConstructions();

  useEffect(() => {
    if (id) {
      getConstruction(id);
    }
  }, [id]);

  return (
    <Formik
      enableReinitialize
      initialValues={constructionData}
      onSubmit={(values) => {
        if (location.pathname.includes("cadastrar")) {
          addConstruction(values);
        } else {
          updateConstruction(values);
        }
      }}
    >
      {({ handleChange, values }) => (
        <FormikForm>
          <Grid item xs={12} lg={12}>
            <Paper className={classes.paper}>
              <div className={classes.actionBar}>
                <div className={classes.actionBarLeftContent}>
                  <IconButton
                    onClick={() => navigate(-1)}
                    className={classes.buttonBack}
                  >
                    <KeyboardArrowLeftIcon fontSize="medium" />
                  </IconButton>
                  <Typography className={classes.pageSubtitle}>
                    {returnedTitlePage(location, "Obra")}
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
                    onClick={() => navigate(`/obras/${id}/editar`)}
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
                  <InputLabel className={classes.inputLabel}>Nome*</InputLabel>
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
                    Responsável*
                  </InputLabel>
                  <TextField
                    name="responsible"
                    value={values.responsible}
                    onChange={handleChange}
                    placeholder="Responsável*"
                    variant="outlined"
                    size="small"
                    fullWidth
                    required
                    disabled={!inCreationOrEditing(location)}
                    // InputProps={{
                    //   inputComponent: InputMask as any,
                    // }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};
