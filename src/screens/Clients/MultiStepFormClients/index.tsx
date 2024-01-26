import React, { useState } from "react";

import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { InputMask } from "../../../components/InputMask";
import { useStyles } from "./styles";
import { Navbar } from "../../../components/Navbar";
import { useClients } from "../../../hooks/useClients";
import { BackgroundAvatar } from "../../../components/Avatar";

let initialValues = {
  responsible: "",
  tradingName: "",
  cnpj: "",
  phone: "",
  email: "",
  corporateName: "",
  municipalRegistration: "",
  stateRegistration: "",
  cep: "",
  state: "",
  city: "",
  neighborhood: "",
  publicPlace: "",
  complement: "",
  number: "",
};

export function MultiStepFormClients() {
  const { classes } = useStyles();
  const { addClientGeneralData } = useClients();

  const onSubmit = async (values: any) => {
    await addClientGeneralData(values);
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", backgroundColor: "#eff1f3", borderBottom: "none" }}
    >
      <CardContent>
        <FormikStepper
          initialValues={initialValues}
          onSubmit={async (values) => {
            console.log("values", values);
            onSubmit(values);
          }}
        >
          <FormikStep label="Dados Gerais">
            <Grid item xs={12} lg={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="responsible"
                      label="Nome Responsável"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="tradingName"
                      label="Nome Fantasia"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="cnpj"
                      label="CNPJ"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
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
                      //required
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="email"
                      label="E-mail"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                      type="email"
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="corporateName"
                      label="Razão Social"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="municipalRegistration"
                      label="Inscrição Municipal"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="stateRegistration"
                      label="Inscrição Estadual"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
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
                      //required
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
                      //required
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
                      //required
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
                      //required
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
                      //required
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
                      //required
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
                      //required
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </FormikStep>
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
                      {step > 0 ? (
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
                      {isSubmitting
                        ? "Enviando"
                        : isLastStep()
                        ? "Finalizar cadastro"
                        : "Avançar"}
                    </Button>
                  </Box>
                </div>
              </div>
            </Paper>
          </Grid>

          <div>
            {childrenArray.map((child, index) => (
              <button
                style={{
                  margin: "1rem",
                  height: "100%",
                  borderRadius: "0.5rem 0.5rem 0px 0px",
                  padding: "0.25rem 1rem 0.25rem 1rem",
                  fontWeight: 600,
                  border: "none",
                  color: "#FFF",
                  cursor: "pointer",
                  backgroundColor: "#0076BE",
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "0.875rem",
                }}
                key={child.props.label}
                onClick={() => setStep(index)}
              >
                {child.props.label}
              </button>
            ))}
          </div>
          {currentChild}

          {/*
          <Grid container spacing={2}>
            <Grid item>
              {step > 0 ? (
                <Button
                  onClick={() => setStep((s) => s - 1)}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Voltar
                </Button>
              ) : null}
            </Grid>
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? "Enviando"
                  : isLastStep()
                  ? "Enviar"
                  : "Avançar"}
              </Button>
            </Grid>
          </Grid>
                */}
        </Form>
      )}
    </Formik>
  );
}
