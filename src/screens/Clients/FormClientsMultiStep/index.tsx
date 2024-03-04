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
} from "@mui/material";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { InputMask } from "../../../components/InputMask";
import { useStyles } from "./styles";
import { useClients } from "../../../hooks/useClients";
import { BackgroundAvatar } from "../../../components/Avatar";
import { useParams } from "react-router-dom";
import { ListClientsRelatedWorks } from "../ListClientsRelatedWorks";
import { ListClientsEmployees } from "../ListClientsEmployees";

export function FormClientsMultiStep() {
  const { id: clientId } = useParams();
  const isEditScreen = clientId;
  const { classes } = useStyles();
  const { clientData, getClient, addClient, updateClient } = useClients();

  const onSubmit = async (values: any) => {
    if (!isEditScreen) {
      await addClient(values);
    } else {
      await updateClient(values);
    }
  };

  useEffect(() => {
    if (clientId) {
      getClient(clientId);
    }
  }, [clientId]);

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", backgroundColor: "#eff1f3", borderBottom: "none" }}
    >
      <CardContent>
        <FormikStepper
          initialValues={clientData}
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
                      required
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
                      required
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="phoneNumber"
                      label="Telefone"
                      variant="outlined"
                      size="small"
                      fullWidth
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
                      required
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
                      required
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
                      required
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
            <FormikStep label="Funcionário">
              <ListClientsEmployees />
            </FormikStep>
          ) : null}

          {isEditScreen ? (
            <FormikStep label="Obras Relacionadas">
              <ListClientsRelatedWorks />
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
  const { id: clientId } = useParams();
  const isEditScreen = clientId;

  function isLastStep() {
    return step === childrenArray.length - 1;
  }
  return (
    <Formik
      {...props}
      validationSchema={currentChild?.props?.validationSchema}
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
      {({ resetForm, isSubmitting, values }) => (
        <Form autoComplete="off">
          <Grid item xs={12} lg={12}>
            <Paper className={classes.paper}>
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  padding: "0.5rem 0 0 0.5rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "Open Sans",
                    fontWeight: 400,
                  }}
                >
                  Clientes
                </div>
                <div>{">"}</div>
                <div
                  style={{
                    fontFamily: "Open Sans",
                    fontWeight: 600,
                    color: "#2E3132",
                  }}
                >
                  Cadastro
                </div>
              </div>
              <div className={classes.actionBar}>
                <div className={classes.actionBarLeftContent}>
                  {values.tradingName && (
                    <BackgroundAvatar avatarName={values.tradingName} />
                  )}
                  <Typography className={classes.pageSubtitle}>
                    {values.tradingName}
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
                          ? "Finalizar"
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
