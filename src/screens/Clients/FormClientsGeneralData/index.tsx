import { Button, Grid, Paper, TextField } from "@mui/material";
import { useStyles } from "./styles";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useClients } from "../../../hooks/useClients";
import { Client } from "../../../types";
import { Navbar } from "../../../components/Navbar";

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
                      placeholder="Nome Responsável"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="tradingName"
                      value={values.tradingName}
                      onChange={handleChange}
                      placeholder="Nome Fantasia"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      value={values.cnpj}
                      onChange={handleChange}
                      name="cnpj"
                      placeholder="CNPJ"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      value={values.phone}
                      onChange={handleChange}
                      name="phone"
                      placeholder="Telefone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      value={values.email}
                      onChange={handleChange}
                      name="email"
                      placeholder="E-mail"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      value={values.corporateName}
                      onChange={handleChange}
                      name="corporateName"
                      placeholder="Razão Social"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      value={values.municipalRegistration}
                      onChange={handleChange}
                      name="municipalRegistration"
                      placeholder="Inscrição Municipal"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      value={values.stateRegistration}
                      onChange={handleChange}
                      name="stateRegistration"
                      placeholder="Inscrição Estadual"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
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
