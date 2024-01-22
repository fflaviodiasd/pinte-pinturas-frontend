import { Button, Grid, Paper, TextField } from "@mui/material";
import { useStyles } from "./styles";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useClients } from "../../../hooks/useClients";
import { Client } from "../../../types";
import { Navbar } from "../../../components/Navbar";
import { InputMask } from "../../../components/InputMask";

export const FormClientsAddress = () => {
  const { classes } = useStyles();
  const { addClientAddress } = useClients();

  const [clientsAddress, setClientsAddress] = useState<Client>({
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
    await addClientAddress(values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={clientsAddress}
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
                      name="cep"
                      value={values.cep}
                      onChange={handleChange}
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
                    <TextField
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      label="Estado"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      label="Cidade"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="neighborhood"
                      value={values.neighborhood}
                      onChange={handleChange}
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
                    <TextField
                      name="publicPlace"
                      value={values.publicPlace}
                      onChange={handleChange}
                      label="Logradouro"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="complement"
                      value={values.complement}
                      onChange={handleChange}
                      label="Complemento"
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="number"
                      value={values.number}
                      onChange={handleChange}
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
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
