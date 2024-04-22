import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid } from "@mui/material";

import { useConstructions } from "../../hooks/useConstructions";

import Breadcrumb from "../../components/Breadcrumb";
import { Navbar } from "../../components/Navbar";
import { Tab } from "../../components/Tab";

import { ServicesConstructions } from "./ServicesConstructions";
import { PackageConstructions } from "./PackageConstructions";
import { ListConstructionsMaterials } from "./Materials";
import { ListLocal } from "./Local";
import { Teams } from "./Teams";

import { TabsContainer } from "./styles";

export const Constructions = () => {
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
      default:
        return <PackageConstructions />;
    }
  };

  return (
    <Grid container sx={{ display: "flex", flexDirection: "column" }}>
      <Navbar
        title={constructionData.corporateName}
        showBreadcrumb={true}
        breadcrumb={
          <Breadcrumb
            breadcrumbPath1="Obras"
            breadcrumbPath2="Edição"
            hrefBreadcrumbPath1="/obras"
          />
        }
      />

      <TabsContainer>
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
      </TabsContainer>

      {displayContent()}
    </Grid>
  );
};
