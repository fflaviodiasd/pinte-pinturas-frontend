import { Grid, Paper, TextField } from "@mui/material";

import { useStyles } from "./styles";

export const FormClientsGeneralData = () => {
  const { classes } = useStyles();

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={1} className={classes.formContainer}>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Nome Responsável"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Nome Fantasia"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="CNPJ"
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
            </Grid>
            <Grid container spacing={1} className={classes.formContainer}>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="E-mail"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Razão Social"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Inscrição Municipal"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
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
    </form>
  );
};
