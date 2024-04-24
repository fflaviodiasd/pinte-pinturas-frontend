import { Grid } from "@mui/material";

export function MeasurementsServices() {
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
        Gráfico serviços
      </Grid>
      <Grid item lg={6}>
        Rentáveis serviços
      </Grid>
    </Grid>
  );
}
