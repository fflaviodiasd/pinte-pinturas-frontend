import React, { useEffect, useState } from "react";

import {
  Grid,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  TextField,
  Paper,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { InputMask } from "../../../components/InputMask";
import { useStyles } from "./styles";
import { BackgroundAvatar } from "../../../components/Avatar";
import { useParams } from "react-router-dom";
import { useCollaborators } from "../../../hooks/useCollaborators";
import { ListClientsHistory } from "../ListCollaboratorsHistory";
import { ListCollaboratorsRelatedWorks } from "../ListCollaboratorsRelatedWorks";

export function FormCollaboratorsMultiStep() {
  const { id: collaboratorId } = useParams();
  const isEditScreen = collaboratorId;
  const { classes } = useStyles();
  const {
    collaboratorData,
    getCollaborator,
    addCollaborator,
    updateCollaborator,
  } = useCollaborators();

  const onSubmit = async (values: any) => {
    if (!isEditScreen) {
      await addCollaborator(values);
    } else {
      await updateCollaborator(values);
    }
  };

  useEffect(() => {
    if (collaboratorId) {
      getCollaborator(collaboratorId);
    }
  }, [collaboratorId]);

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", backgroundColor: "#eff1f3", borderBottom: "none" }}
    >
      <CardContent>
        <FormikStepper
          initialValues={collaboratorData}
          onSubmit={async (values) => {
            console.log("values", values);
            onSubmit(values);
          }}
        >
          <FormikStep label="Dados Pessoais">
            <Grid item xs={12} lg={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="name"
                      label="Nome Completo"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="role"
                      label="Cargo"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="profile"
                      label="Perfil"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="phone"
                      label="Celular"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="cpf"
                      label="CPF"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="dateOfBirth"
                      label="Data de Nascimento"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="registration"
                      label="Matrícula"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="email"
                      label="E-mail"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      type="email"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="admissionDate"
                      label="Data de Admissão"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="dismissalDate"
                      label="Data de Demissão"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="phone"
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                      required
                    />
                  </Grid>
                  <Box marginLeft="1rem">
                    <FormControlLabel control={<Switch />} label="Ativo" />
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </FormikStep>

          <FormikStep label="Endereço">
            <Grid item xs={12} lg={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="cep"
                      label="CEP"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="state"
                      label="Estado"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="city"
                      label="Cidade"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="neighborhood"
                      label="Bairro"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={6}>
                    <Field
                      as={TextField}
                      name="publicPlace"
                      label="Logradouro"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="complement"
                      label="Complemento"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="number"
                      label="Número"
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </FormikStep>

          {isEditScreen ? (
            <FormikStep label="Histórico">
              <ListClientsHistory />
            </FormikStep>
          ) : null}

          {isEditScreen ? (
            <FormikStep label="Obras Relacionadas">
              <ListCollaboratorsRelatedWorks />
            </FormikStep>
          ) : null}
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues> & { children: React.ReactNode }) {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[
    step
  ] as React.ReactElement<FormikStepProps>;
  const [completed, setCompleted] = useState(false);
  const { classes } = useStyles();
  const { id: collaboratorId } = useParams();
  const isEditScreen = collaboratorId;

  function isLastStep() {
    return step === childrenArray.length - 1;
  }
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else if (isEditScreen && !isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
      enableReinitialize={true}
    >
      {({ resetForm, isSubmitting }) => (
        <Form autoComplete="off">
          <Grid item xs={12} lg={12}>
            <Paper className={classes.paper}>
              <div className={classes.actionBar}>
                <div className={classes.actionBarLeftContent}>
                  <BackgroundAvatar />
                  <Typography className={classes.pageSubtitle}>
                    Smile Company
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Grid item>
                      {step > 0 && !isEditScreen ? (
                        <Button
                          onClick={() => setStep((s) => s - 1)}
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          className={classes.buttonSave}
                        >
                          Voltar
                        </Button>
                      ) : null}
                    </Grid>
                    {isEditScreen && step > 1 ? null : (
                      <Button
                        startIcon={
                          isSubmitting ? <CircularProgress size="1rem" /> : null
                        }
                        disabled={isSubmitting}
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.buttonSave}
                      >
                        {isEditScreen && step <= 1
                          ? "Salvar"
                          : isLastStep()
                          ? "Finalizar cadastro"
                          : "Avançar"}
                      </Button>
                    )}
                  </Box>
                </div>
              </div>
            </Paper>
          </Grid>

          <div style={{ display: "flex" }}>
            {childrenArray.map((child, index) => (
              <div
                style={{
                  margin: "1rem",
                  height: "100%",
                  borderRadius: "0.5rem 0.5rem 0px 0px",
                  padding: "0.25rem 1rem 0.25rem 1rem",
                  fontWeight: 600,
                  border: "none",
                  backgroundColor: index === step ? "#0076BE" : "#eff1f3",
                  color: index === step ? "#FFF" : "#0076BE",
                  cursor: isEditScreen ? "pointer" : undefined,
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "0.875rem",
                }}
                key={child.props.label}
                onClick={isEditScreen ? () => setStep(index) : undefined}
              >
                {child.props.label}
              </div>
            ))}
          </div>
          {currentChild}
        </Form>
      )}
    </Formik>
  );
}
