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

export const FormCollaboratorsPersonalData = () => {
  const { classes } = useStyles();

  return (
    <form>
      <Grid container spacing={2}>
        <Navbar />
        <Grid item xs={12} lg={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={1} className={classes.formContainer}>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="Nome Completo"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="Cargo"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="Perfil"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  name="phone"
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
                  label="Data de Nascimento"
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
                  label="Matrícula"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="E-mail"
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
                  label="Data de Admissão"
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
                  label="Data de Demissão"
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
    </form>
  );
};
