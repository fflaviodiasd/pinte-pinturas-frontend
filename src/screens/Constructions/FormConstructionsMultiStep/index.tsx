import React, { useEffect, useState } from "react";

import {
  Grid,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  TextField,
  Select,
  Paper,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { InputMask } from "../../../components/InputMask";
import { useStyles, IOSSwitch } from "./styles";
// import { useCostumers } from "../../../hooks/useCustomers";
import { useCompanies } from "../../../hooks/useCompanies";
import { useConstructions } from "../../../hooks/useConstructions";
import { BackgroundAvatar } from "../../../components/Avatar";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";

const FormikSwitch = ({ field, form, ...props }) => {
  return (
    <FormControlLabel
      control={
        <IOSSwitch 
          checked={field.value}
          sx={{ m: 1 }}
          onChange={(event) => form.setFieldValue(field.name, event.target.checked)}
          {...props}
        />
      }
      label={field.value ? "Ativo" : "Inativo"}
    />
  );
};

export function FormConstructionsMultiStep() {
  const { id: clientId } = useParams();
  const isEditScreen = clientId;
  const { classes } = useStyles();
  const { constructData } = useCompanies();
  // const { getAllClients, listClients } = useClients();
  const { getAllCompanyCustomers, listCompanyCustomers } = useCompanies();
  const { addConstruction, addCompaniesConstruction } = useConstructions();
  const [selectedClientId, setSelectedClientId] = useState(''); // Estado para guardar o ID do cliente selecionado
  const [selectedClient, setSelectedClient] = useState(''); // Estado para guardar o cliente selecionado


  // const onSubmit = async (values: any) => {
  //   if (!isEditScreen) {
  //     await addCostu(values);
  //   } else {
  //     await updateClient(values);
  //   }
  // };


  const onSubmit = async (values:any) => {
    console.log("values", values);
    console.log("selectedClientId", selectedClientId);
    const valuesToSend = {
      ...values,
      customer: selectedClientId,
    };
    await addCompaniesConstruction(valuesToSend);
  };

  useEffect(() => {
    getAllCompanyCustomers();
  }, []);

  useEffect(() => {
    console.log("listCompanies updated:", listCompanyCustomers);
  }, [listCompanyCustomers]);

  // useEffect(() => {
  //   if (clientId) {
  //     getClient(clientId);
  //   }
  // }, [clientId]);

  return (
    <Card
      variant="outlined"
      sx={{ width: "100%", backgroundColor: "#eff1f3", borderBottom: "none" }}
    >
      <CardContent>
        <FormikStepper
          initialValues={constructData}
          onSubmit={async (values) => {
            console.log("values", values);
            onSubmit(values);
          }}
        >
          <FormikStep label="Dados Gerais">
            <Grid item xs={12} lg={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={5}>
                    <Field
                      as={TextField}
                      name="fantasy_name"
                      label="Nome Fantasia"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={5}>
                  <Field
                    name="customer"
                    label="Cliente"
                    as={Select}
                    variant="outlined"
                    size="small"
                    fullWidth
                    onChange={(event:any) => {
                      const { value } = event.target;
                      console.log("value", value);
                      // setFieldValue('client', value); // Atualiza o valor no Formik
                      setSelectedClientId(value); // Atualiza o estado com o ID do cliente
                    }}                  >
                    
                        {listCompanyCustomers.map((client) => (
                          <MenuItem key={client.id} value={client.id}>
                            {client.name}
                          </MenuItem>
                        ))}
                      </Field>
                  </Grid>
                  <Grid item xs={12} lg={2}>
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
                    />
                  </Grid>
             
              
                </Grid>
                <Grid container spacing={1} className={classes.formContainer}>
                <Grid item xs={12} lg={4}>
                    <Field
                      as={TextField}
                      name="corporate_name"
                      label="Razão Social"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={2}>
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
                  <Grid item xs={12} lg={2}>
                    <Field
                      as={TextField}
                      name="cno"
                      label="CNO"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Field
                      as={TextField}
                      name="email"
                      label="E-mail"
                      variant="outlined"
                      size="small"
                      fullWidth
                      // required
                      type="email"
                    />
                  </Grid>
               
              
                </Grid>
                <Grid container spacing={1} className={classes.formContainer}>
                <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="municipal_registration"
                      label="Inscrição Municipal"
                      variant="outlined"
                      size="small"
                      fullWidth
                      // required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Field
                      as={TextField}
                      name="state_registration"
                      label="Inscrição Estadual"
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                <Field
                  name="isActive"
                  component={FormikSwitch} 
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
                      name="public_place"
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
              {/* <ListClientsEmployees /> */}
            </FormikStep>
          ) : null}

          {isEditScreen ? (
            <FormikStep label="Obras Relacionadas">
              {/* <ListClientsRelatedWorks /> */}
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
              {isEditScreen ? (
                <Breadcrumb
                  breadcrumbPath1={"Obras"}
                  breadcrumbPath2={"Edição"}
                />
              ) : (
                <Breadcrumb
                  breadcrumbPath1={"Obras"}
                  breadcrumbPath2={"Cadastro"}
                />
              )}

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
