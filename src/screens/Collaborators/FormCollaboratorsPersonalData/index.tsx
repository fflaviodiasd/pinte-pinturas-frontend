import {
  Box,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
} from "@mui/material";

import { useStyles } from "./styles";

export const FormCollaboratorsPersonalData = () => {
  const { classes } = useStyles();

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={1} className={classes.formContainer}>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Nome Completo"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Cargo"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Perfil"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Celular"
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
                  placeholder="CPF"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Data de Nascimento"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Matrícula"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="E-mail"
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
                  placeholder="Data de Admissão"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Data de Demissão"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Telefone"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
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
