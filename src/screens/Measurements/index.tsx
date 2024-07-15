import { useContext, useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  // useNavigate
} from "react-router-dom";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { KeyboardArrowDownRounded as ArrowForwardIcon } from "@mui/icons-material/";

import {
  MeasurementsContext,
  MeasurementsContextProvider,
} from "../../contexts/MeasurementsContext";
// import { MeasurementsServices } from "./Services";

import { ModalFilters } from "./components/ModalFilters";
import { MeasurementsPackages } from "./Packages";

import { Tab, useStyles } from "./styles";

export const Measurements = () => {
  return (
    <MeasurementsContextProvider>
      <MeasurementsComponent />
    </MeasurementsContextProvider>
  );
};

function MeasurementsComponent() {
  const location = useLocation();
  // const navigate = useNavigate();
  const { classes } = useStyles();
  const { selectedConstruction, setSelectedConstruction } = useContext(MeasurementsContext);
  const {id: constructionID}: any = useParams();

  useEffect(() => {
    setSelectedConstruction({
      id: parseInt(constructionID),
      name: '',
    });
  }, [])

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
      <Grid item sm={12} md={12} lg={12} className={classes.tabContainer}>
        <Grid item sm={2} md={2} lg={2} style={{ display: "flex", gap: 8 }}>
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
        <Grid item sm={2} md={2} lg={2} />
        <Grid item sm={8} md={8} lg={8} className={classes.filterContainer}>
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
