import { Grid } from "@mui/material";

import { useStyles } from "./styles";

export function MeasurementsServices() {
  const { classes } = useStyles();

  return (
    <Grid item lg={12} className={classes.content}>
      <Grid item lg={6}>
        Gráfico serviços
      </Grid>
      <Grid item lg={6}>
        Rentáveis serviços
      </Grid>
    </Grid>
  );
}
