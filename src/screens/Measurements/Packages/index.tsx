import { Grid } from "@mui/material";
import { useStyles } from "./styles";

export function MeasurementsPackages() {
  const { classes } = useStyles();

  return (
    <Grid item lg={12} className={classes.content}>
      <Grid item lg={6}>
        Gráfico pacotes
      </Grid>
      <Grid item lg={6}>
        Rentáveis pacotes
      </Grid>
    </Grid>
  );
}
