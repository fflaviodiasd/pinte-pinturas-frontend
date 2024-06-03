import { Grid } from "@mui/material";
import { Table } from "./Table";

export function GeneralData() {
  return (
    <Grid
      container
      style={{ paddingRight: 24, paddingLeft: 24, backgroundColor: "#EEE" }}
    >
      <Table />
    </Grid>
  );
}
