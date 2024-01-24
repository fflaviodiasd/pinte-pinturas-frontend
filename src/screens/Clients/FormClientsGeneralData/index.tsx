import { Button, Grid, Paper, TextField } from "@mui/material";
import { useStyles } from "./styles";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useClients } from "../../../hooks/useClients";
import { Client } from "../../../types";
import { Navbar } from "../../../components/Navbar";
import { InputMask } from "../../../components/InputMask";

export const FormClientsGeneralData = () => {
  const { classes } = useStyles();
  const { addClientGeneralData } = useClients();

  const [clientsGeneralData, setClientsGeneralData] = useState<Client>({
    id: 0,
    name: "",
    status: true,
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
  });

  const onSubmit = async (values: any) => {
    await addClientGeneralData(values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={clientsGeneralData}
      onSubmit={(values) => {
        onSubmit(values);
        console.log(values);
      }}
    >
      {({ handleChange, values }) => (
        <Form>
          <Grid container spacing={2}>
            <Navbar />
            <Grid item xs={12} lg={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="responsible"
                      value={values.responsible}
                      onChange={handleChange}
                      label="Nome Responsável"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="tradingName"
                      value={values.tradingName}
                      onChange={handleChange}
                      label="Nome Fantasia"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      value={values.cnpj}
                      onChange={handleChange}
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
                    <TextField
                      value={values.phone}
                      onChange={handleChange}
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
                    <TextField
                      value={values.email}
                      onChange={handleChange}
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
                    <TextField
                      value={values.corporateName}
                      onChange={handleChange}
                      name="corporateName"
                      label="Razão Social"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      value={values.municipalRegistration}
                      onChange={handleChange}
                      name="municipalRegistration"
                      label="Inscrição Municipal"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      value={values.stateRegistration}
                      onChange={handleChange}
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
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
