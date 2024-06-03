import { Grid } from "@mui/material";

import { EmployeeCarousel } from "./components/EmployeeCarousel";
import { FollowUpTable } from "./components/FollowUpTable";
import { BarGraph } from "./components/BarGraph";
import { PieGraph } from "./components/PieGraph";

import { useStyles } from "./styles";

export function FollowUp() {
  const { classes } = useStyles();

  return (
    <Grid container className={classes.content}>
      <BarGraph />
      <PieGraph />
      <EmployeeCarousel />
      <FollowUpTable />
    </Grid>
  );
}
