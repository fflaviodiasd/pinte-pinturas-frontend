import { Grid } from "@mui/material";

import { ProfitableTable } from "./components/ProfitableTable";
import { ExecutionGraph } from "./components/ExecutionGraph";
import { DataTable } from "./components/DataTable";

import { useStyles } from "./styles";

export function MeasurementsPackages() {
  const { classes } = useStyles();

  return (
    <Grid item md={12} lg={12} className={classes.content}>
      <Grid item md={8} lg={8} className={classes.graphContainer}>
        <ExecutionGraph />
        <DataTable />
      </Grid>

      <ProfitableTable />
    </Grid>
  );
}
