import { useState } from "react";
import {
  useLocation,
  // useNavigate
} from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";

import { MeasurementsPackages } from "./Packages";
// import { MeasurementsServices } from "./Services";

import { ModalFilters } from "./components/ModalFilters";
import { Tab, useStyles } from "./styles";

export function Measurements() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { classes } = useStyles();

  // const displayContent = () => {
  //   if (location.pathname.includes("pacotes")) {
  //     return <MeasurementsPackages />;
  //   } else {
  //     return <MeasurementsServices />;
  //   }
  // };

  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("scope");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item lg={12} className={classes.titleContainer}>
        <Typography className={classes.title}>Medições</Typography>
      </Grid>
      <Grid item lg={12} className={classes.tabContainer}>
        <Grid item lg={2} style={{ display: "flex", gap: 8 }}>
          {/* <Tab
            text="Serviços"
            isActive={!location.pathname.includes("pacotes")}
            onClick={() => navigate(`/medicoes/`)}
          /> */}
          <Tab
            text="Pacotes"
            // isActive={location.pathname.includes("pacotes")}
            isActive={location.pathname.includes("medicoes")}
            // onClick={() => navigate(`/medicoes/pacotes`)}
            onClick={() => {}}
          />
        </Grid>
        <Grid item lg={4} />
        <Grid item lg={6} className={classes.filterContainer}>
          <Button
            className={classes.filterButton}
            onClick={() => {
              setSelectedFilter("scope");
              handleClickOpen();
            }}
          >
            Escopo
          </Button>
          <Button
            className={classes.filterButton}
            onClick={() => {
              setSelectedFilter("step");
              handleClickOpen();
            }}
          >
            Etapa
          </Button>
          <Button
            className={classes.filterButton}
            onClick={() => {
              setSelectedFilter("service");
              handleClickOpen();
            }}
          >
            Serviço
          </Button>
          <Button
            className={classes.filterButton}
            onClick={() => {
              setSelectedFilter("unit");
              handleClickOpen();
            }}
          >
            Unidade
          </Button>
          <Button
            className={classes.filterButton}
            onClick={() => {
              setSelectedFilter("period");
              handleClickOpen();
            }}
          >
            Período
          </Button>
          <Button
            className={classes.filterButton}
            onClick={() => {
              setSelectedFilter("profitability");
              handleClickOpen();
            }}
          >
            Rentabilidade
          </Button>
        </Grid>
      </Grid>

      {/* {displayContent()} */}
      <MeasurementsPackages />

      <ModalFilters
        open={open}
        handleClose={handleClose}
        filter={selectedFilter}
      />
    </Grid>
  );
}
