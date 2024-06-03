import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

import { useConstructions } from "../../hooks/useConstructions";

import { Breadcrumb } from "../../components/Breadcrumb";

import { Tab } from "../../components/Tab";

import { MeasurementsConstructions } from "./MeasurementsConstructions";
import { SupervisorConstructions } from "./SupervisorConstructions";
import { ServicesConstructions } from "./ServicesConstructions";
import { PackageConstructions } from "./PackageConstructions";
import { CustomerSupervisor } from "./CustomerSupervisor";
import { GeneralData } from "./GeneralData";
import { GeneralProduction } from "./GeneralProduction";
import { GeneralMeasurements } from "./GeneralMeasurements";
import { ListConstructionsMaterials } from "./Materials";
import { ListLocal } from "./Local";
import { Teams } from "./Teams";

import { useStyles } from "./styles";

export const Constructions = () => {
  const { classes } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { id: constructionId } = useParams();

  const { constructionData, getConstruction } = useConstructions();

  useEffect(() => {
    if (constructionId) {
      getConstruction(constructionId);
    }
  }, [constructionId]);

  const displayContent = () => {
    switch (true) {
      case location.pathname.includes("materiais"):
        return <ListConstructionsMaterials />;
      case location.pathname.includes("equipes"):
        return <Teams />;
      case location.pathname.includes("locais"):
        return <ListLocal />;
      case location.pathname.includes("servicos"):
        return <ServicesConstructions />;
      case location.pathname.includes("pacotes"):
        return <PackageConstructions />;
      case location.pathname.includes("medicoes"):
        return <MeasurementsConstructions />;
      case location.pathname.includes("supervisores"):
        return <SupervisorConstructions />;
      case location.pathname.includes("encarregados-cliente"):
        return <CustomerSupervisor />;
      case location.pathname.includes("conferencia-gerais-sistema"):
        return <GeneralData />;
      case location.pathname.includes("conferencia-dados-sistema"):
        return <GeneralMeasurements />;
      case location.pathname.includes("conferencia-producao-sistema"):
        return <GeneralProduction />;
      default:
        return <ListConstructionsMaterials />;
    }
  };

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} className={classes.headerContainer}>
        <Breadcrumb
          breadcrumbPath1="Obras"
          breadcrumbPath2="Edição"
          hrefBreadcrumbPath1="/obras"
        />
        <Typography className={classes.title}>
          {constructionData.corporateName}
        </Typography>
      </Grid>

      <Grid item sm={12} md={12} lg={12} className={classes.tabsContainer}>
        <Tab
          text="Materiais"
          isActive={location.pathname.includes("materiais")}
          onClick={() => navigate(`/obras/${constructionId}/materiais`)}
        />

        <Tab
          text="Equipes"
          isActive={location.pathname.includes("equipes")}
          onClick={() => navigate(`/obras/${constructionId}/equipes`)}
        />

        <Tab
          text="Locais"
          isActive={location.pathname.includes("locais")}
          onClick={() => navigate(`/obras/${constructionId}/locais`)}
        />

        <Tab
          text="Serviços"
          isActive={location.pathname.includes("servicos")}
          onClick={() => navigate(`/obras/${constructionId}/servicos`)}
        />

        <Tab
          text="Pacotes"
          isActive={location.pathname.includes("pacotes")}
          onClick={() => navigate(`/obras/${constructionId}/pacotes`)}
        />

        <Tab
          text="Medições"
          isActive={location.pathname.includes("medicoes")}
          onClick={() => navigate(`/obras/${constructionId}/medicoes`)}
        />

        <Tab
          text="Encarregados"
          isActive={location.pathname.includes("supervisores")}
          onClick={() => navigate(`/obras/${constructionId}/supervisores`)}
        />

        <Tab
          text="Encarregados do Cliente"
          isActive={location.pathname.includes("encarregados-cliente")}
          onClick={() =>
            navigate(`/obras/${constructionId}/encarregados-cliente`)
          }
        />
        <Tab
          text="Dados Gerais do Sistema"
          isActive={location.pathname.includes("conferencia-gerais-sistema")}
          onClick={() =>
            navigate(`/obras/${constructionId}/conferencia-gerais-sistema`)
          }
        />
        <Tab
          text="Medições do Sistema"
          isActive={location.pathname.includes("conferencia-dados-sistema")}
          onClick={() =>
            navigate(`/obras/${constructionId}/conferencia-dados-sistema`)
          }
        />
        <Tab
          text="Produção do Sistema"
          isActive={location.pathname.includes("conferencia-producao-sistema")}
          onClick={() =>
            navigate(`/obras/${constructionId}/conferencia-producao-sistema`)
          }
        />
      </Grid>

      <Grid item sm={12} md={12} lg={12} className={classes.contentContainer}>
        {displayContent()}
      </Grid>
    </Grid>
  );
};
