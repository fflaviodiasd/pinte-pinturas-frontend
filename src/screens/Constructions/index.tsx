import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { HeaderButton } from "../../components/Screen/HeaderButton";
import { ConstructionsMaterials } from "./Materials";
import { ConstructionsTeams } from "./Teams";

export const Constructions = () => {
  const [indexDisplay, setIndexDisplay] = useState(0);

  const handleChangeContent = (indexDisplay: number) => {
    setIndexDisplay(indexDisplay);
  };

  const displayContent = (indexDisplay: number) => {
    if (indexDisplay === 0) {
      return <ConstructionsMaterials />;
    }
    if (indexDisplay === 1) {
      return <ConstructionsTeams />;
    }
  };

  return (
    <Grid container sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex" }}>
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
      </Box>

      {displayContent(indexDisplay)}
    </Grid>
  );
};
