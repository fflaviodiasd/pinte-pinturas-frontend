import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, IconButton, Typography } from "@mui/material";
import { KeyboardArrowDownRounded as ArrowForwardIcon } from "@mui/icons-material/";

import {
  AppointmentsContext,
  AppointmentsContextProvider,
} from "../../contexts/AppointmentsContext";

import { MeasurementsSystem } from "./MeasurementsSystem";
import { GeneralDataSystem } from "./GeneralDataSystem";
import { ProductionSystem } from "./ProductionSystem";

import { ModalFilters } from "./components/ModalFilters";

import { Tab, useStyles } from "./styles";

export const Appointments = () => {
  return (
    <AppointmentsContextProvider>
      <AppointmentsComponent />
    </AppointmentsContextProvider>
  );
};

function AppointmentsComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { selectedConstruction, setSelectedConstruction } = useContext(AppointmentsContext);

  const displayContent = () => {
    if (location.pathname.includes("dados-do-sistema")) {
      return <GeneralDataSystem />;
    } else if (location.pathname.includes("medicoes-do-sistema")) {
      return <MeasurementsSystem />;
    } else {
      return <ProductionSystem />;
    }
  };

  const [open, setOpen] = useState(false);
  const {id: constructionID}: any = useParams();

  const handleClickOpen = () => {
    setOpen(true);
    
  };
  useEffect(() => {
    setSelectedConstruction({
      id: parseInt(constructionID),
      name: '',
    });
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} className={classes.titleContainer}>
      </Grid>
      <Grid item sm={12} md={12} lg={12} className={classes.tabContainer}>
        <Grid item sm={12} md={12} lg={12} style={{ display: "flex", gap: 8 }}>
          <Tab
            text="Dados Gerais do Sistema"
            isActive={location.pathname.includes("dados-do-sistema")}
            onClick={() => navigate(`/obras/${constructionID}/medicoes/dados-do-sistema`)}
          />
          <Tab
            text="Medições do Sistema"
            isActive={location.pathname.includes("medicoes-do-sistema")}
            onClick={() => navigate(`/obras/${constructionID}/medicoes/medicoes-do-sistema`)}
          />
          <Tab
            text="Produção do Sistema"
            isActive={location.pathname.includes("producao-do-sistema")}
            onClick={() => navigate(`/obras/${constructionID}/medicoes/producao-do-sistema`)}
          />
        </Grid>
      </Grid>

      {displayContent()}

      <ModalFilters open={open} handleClose={handleClose} />
    </Grid>
  );
}
