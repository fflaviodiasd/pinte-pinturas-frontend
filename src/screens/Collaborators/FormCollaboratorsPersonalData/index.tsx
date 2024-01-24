import {
  Box,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
} from "@mui/material";

import { useStyles } from "./styles";
import { Navbar } from "../../../components/Navbar";
import { InputMask } from "../../../components/InputMask";
import { Form, Formik } from "formik";
import { useCollaborators } from "../../../hooks/useCollaborators";
import { useState } from "react";
import { Collaborator } from "../../../types";

export const FormCollaboratorsPersonalData = () => {
  const { classes } = useStyles();
  const { addCollaboratorPersonalData } = useCollaborators();

  const [collaboratorsPersonalData, setCollaboratorsPersonalData] =
    useState<Collaborator>({
      id: 0,
      name: "",
      type: 3,
      status: true,
      role: "",
      profile: "",
      phone: "",
      cpf: "",
      dateOfBirth: "",
      registration: "",
      email: "",
      admissionDate: "",
      dismissalDate: "",
    });

  const onSubmit = async (values: any) => {
    await addCollaboratorPersonalData(values);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={collaboratorsPersonalData}
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
                      name="name"
                      label="Nome Completo"
                      value={values.name}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="role"
                      label="Cargo"
                      value={values.role}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="profile"
                      label="Perfil"
                      value={values.profile}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      label="Celular"
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
                      name="cpf"
                      label="CPF"
                      value={values.cpf}
                      onChange={handleChange}
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
                      name="dateOfBirth"
                      label="Data de Nascimento"
                      value={values.dateOfBirth}
                      onChange={handleChange}
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
                      name="registration"
                      label="Matrícula"
                      value={values.registration}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                    />
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="email"
                      label="E-mail"
                      value={values.email}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                      type="email"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.formContainer}>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      name="admissionDate"
                      label="Data de Admissão"
                      value={values.admissionDate}
                      onChange={handleChange}
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
                      name="dismissalDate"
                      label="Data de Demissão"
                      value={values.dismissalDate}
                      onChange={handleChange}
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
                      name="phone"
                      label="Telefone"
                      value={values.phone}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      fullWidth
                      //required
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                    />
                  </Grid>
                  <Box marginLeft="1rem">
                    <FormControlLabel control={<Switch />} label="Ativo" />
                  </Box>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
