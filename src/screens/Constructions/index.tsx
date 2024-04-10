import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { HeaderButton } from "../../components/Screen/HeaderButton";
import { ConstructionsTeams } from "./Teams";
import { ListConstructionsMaterials } from "./Materials";
import { ListLocal } from "./Local";
import { Navbar } from "../../components/Navbar";
import { TitleScreen } from "../../components/TitleScreen";
import Breadcrumb from "../../components/Breadcrumb";
import { useConstructions } from "../../hooks/useConstructions";
import { useParams } from "react-router-dom";
import { ServicesConstructions } from "./ServicesConstructions";
import { PackageConstructions } from "./PackageConstructions";

export const Constructions = () => {
  const { id: constructionId } = useParams();
  const [indexDisplay, setIndexDisplay] = useState(0);
  const [selectedConstructionName, setSelectedConstructionName] = useState("");
  const { constructionData, getConstruction } = useConstructions();

  console.log('cId',constructionId);

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

  const handleChangeContent = (indexDisplay: number) => {
    setIndexDisplay(indexDisplay);
  };

  const displayContent = (indexDisplay: number) => {
    if (indexDisplay === 0) {
      return <ListConstructionsMaterials />;
    }
    if (indexDisplay === 1) {
      return <ConstructionsTeams />;
    }
    if (indexDisplay === 2) {
      return <ListLocal />;
    }
    if (indexDisplay === 3) {
      return <ServicesConstructions />
    }
    if (indexDisplay === 4) {
      return <PackageConstructions />
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
          isActive={indexDisplay === 0}
          onClick={() => handleChangeContent(0)}
        />

        <HeaderButton
          text="Equipes"
          isActive={indexDisplay === 1}
          onClick={() => handleChangeContent(1)}
        />

        <HeaderButton
          text="Locais"
          isActive={indexDisplay === 2}
          onClick={() => handleChangeContent(2)}
        />

        <HeaderButton
          text="Serviços"
          isActive={indexDisplay === 3}
          onClick={() => handleChangeContent(3)}
        />

        
        <HeaderButton
          text="Pacotes"
          isActive={indexDisplay === 4}
          onClick={() => handleChangeContent(4)}
        />
      </Box>

      {displayContent(indexDisplay)}
    </Grid>
  );
};
