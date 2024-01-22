import { Grid, Paper, TextField } from "@mui/material";

import { useStyles } from "./styles";
import { Navbar } from "../../../components/Navbar";
import { InputMask } from "../../../components/InputMask";

export const FormClientsAddress = () => {
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
                  name="cep"
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
                  label="Estado"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="Cidade"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
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
                  label="Logradouro"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
                  label="Complemento"
                  variant="outlined"
                  size="small"
                  fullWidth
                  //required
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                <TextField
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
    </form>
  );
};
