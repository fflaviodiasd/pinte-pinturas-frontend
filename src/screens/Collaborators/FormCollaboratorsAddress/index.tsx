import { Grid, Paper, TextField } from "@mui/material";

import { useStyles } from "./styles";
import { Navbar } from "../../../components/Navbar";

export const FormCollaboratorsAddress = () => {
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
                  placeholder="CEP"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Estado"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Cidade"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Bairro"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.formContainer}>
              <Grid item xs={12} lg={6}>
                <TextField
                  placeholder="Logradouro"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Complemento"
                  variant="outlined"
                  size="small"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  placeholder="Número"
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
