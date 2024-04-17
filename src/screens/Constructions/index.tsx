import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { HeaderButton } from "../../components/Screen/HeaderButton";
import { Teams } from "./Teams";
import { ListConstructionsMaterials } from "./Materials";
import { ListLocal } from "./Local";
import { Navbar } from "../../components/Navbar";
import { TitleScreen } from "../../components/TitleScreen";
import Breadcrumb from "../../components/Breadcrumb";
import { useConstructions } from "../../hooks/useConstructions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ServicesConstructions } from "./ServicesConstructions";
import { PackageConstructions } from "./PackageConstructions";

export const Constructions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: constructionId } = useParams();

  const { constructionData, getConstruction } = useConstructions();

  const [selectedConstructionName, setSelectedConstructionName] = useState("");

  useEffect(() => {
    if (constructionId) {
      getConstruction(constructionId);
    }
  }, [constructionId]);

  useEffect(() => {
    if (constructionData && constructionData.corporateName) {
      setSelectedConstructionName(constructionData.corporateName);
    }
  }, [constructionData]);

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
      <div>
        <Navbar
          title={<TitleScreen title={selectedConstructionName} />}
          showBreadcrumb={true}
          breadcrumb={
            <Breadcrumb
              breadcrumbPath1={"Obras"}
              breadcrumbPath2={"Edição"}
              hrefBreadcrumbPath1={"/obras"}
            />
          }
        />
      </div>

      <Box sx={{ display: "flex", backgroundColor: "#eff1f3" }}>
        <HeaderButton
          text="Materiais"
          isActive={location.pathname.includes("materiais")}
          onClick={() => navigate(`/obras/${constructionId}/materiais`)}
        />

        <HeaderButton
          text="Equipes"
          isActive={location.pathname.includes("equipes")}
          onClick={() => navigate(`/obras/${constructionId}/equipes`)}
        />

        <HeaderButton
          text="Locais"
          isActive={location.pathname.includes("locais")}
          onClick={() => navigate(`/obras/${constructionId}/locais`)}
        />

        <HeaderButton
          text="Serviços"
          isActive={location.pathname.includes("servicos")}
          onClick={() => navigate(`/obras/${constructionId}/servicos`)}
        />

        <HeaderButton
          text="Pacotes"
          isActive={location.pathname.includes("pacotes")}
          onClick={() => navigate(`/obras/${constructionId}/pacotes`)}
        />
      </Box>

      {displayContent()}
    </Grid>
  );
};
