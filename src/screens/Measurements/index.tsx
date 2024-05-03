import { Grid, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { MeasurementsPackages } from "./Packages";
import { MeasurementsServices } from "./Services";

import { Tab, useStyles } from "./styles";

export function Measurements() {
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();

  const displayContent = () => {
    if (location.pathname.includes("pacotes")) {
      return <MeasurementsPackages />;
    } else {
      return <MeasurementsServices />;
    }
  };

  return (
    <Grid container>
      <Grid item lg={12} className={classes.titleContainer}>
        <Typography className={classes.title}>Medições</Typography>
      </Grid>
      <Grid
        item
        lg={12}
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "24px 16px",
          backgroundColor: "#EEE",
        }}
      >
        <Grid item lg={2} style={{ display: "flex", gap: 8 }}>
          <Tab
            text="Serviços"
            isActive={!location.pathname.includes("pacotes")}
            onClick={() => navigate(`/medicoes/`)}
          />
          <Tab
            text="Pacotes"
            isActive={location.pathname.includes("pacotes")}
            onClick={() => navigate(`/medicoes/pacotes`)}
          />
        </Grid>
        <Grid item lg={4} />
        <Grid item lg={6}>
          Filtros
        </Grid>
      </Grid>

      {displayContent()}
    </Grid>
  );
}
