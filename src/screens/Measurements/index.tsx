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
        <Grid item lg={2} />
        <Grid item lg={8} className={classes.filterContainer}>
          {listFilters.map((filter) => (
            <Button
              key={filter.filterName}
              className={classes.filterButton}
              onClick={() => {
                setSelectedFilter(filter.filterName);
                handleClickOpen();
              }}
            >
              {filter.text}
            </Button>
          ))}
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

const listFilters = [
  { text: "Diárias", filterName: "daily" },
  { text: "Período", filterName: "period" },
  { text: "Pacotes", filterName: "package" },
  { text: "Rentabilidade", filterName: "profitability" },
  { text: "Disciplina", filterName: "discipline" },
];
