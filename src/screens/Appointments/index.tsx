import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const { selectedConstruction } = useContext(AppointmentsContext);

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} className={classes.titleContainer}>
        <Typography className={classes.title}>Apontamentos</Typography>

        <div className={classes.constructionFilterContainer}>
          <Typography
            className={classes.constructionFilterText}
            onClick={() => handleClickOpen()}
          >
            {selectedConstruction.name
              ? selectedConstruction.name
              : "Selecionar Obra"}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={() => handleClickOpen()}
          >
            <ArrowForwardIcon
              className={classes.openFilterButton}
              fontSize="small"
            />
          </IconButton>
        </div>
      </Grid>
      <Grid item sm={12} md={12} lg={12} className={classes.tabContainer}>
        <Grid item sm={12} md={12} lg={12} style={{ display: "flex", gap: 8 }}>
          <Tab
            text="Dados Gerais do Sistema"
            isActive={location.pathname.includes("dados-do-sistema")}
            onClick={() => navigate(`/apontamentos/dados-do-sistema`)}
          />
          <Tab
            text="Medições do Sistema"
            isActive={location.pathname.includes("medicoes-do-sistema")}
            onClick={() => navigate(`/apontamentos/medicoes-do-sistema`)}
          />
          <Tab
            text="Produção do Sistema"
            isActive={location.pathname.includes("producao-do-sistema")}
            onClick={() => navigate(`/apontamentos/producao-do-sistema`)}
          />
        </Grid>
      </Grid>

      {displayContent()}

      <ModalFilters open={open} handleClose={handleClose} />
    </Grid>
  );
}
