import { Grid } from "@mui/material";

export function MeasurementsPackages() {
  return (
    <Grid
      item
      lg={12}
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 16,
        backgroundColor: "#EEE",
      }}
    >
      <Grid item lg={6}>
        Gráfico pacotes
      </Grid>
      <Grid item lg={6}>
        Rentáveis pacotes
      </Grid>
    </Grid>
  );
}
