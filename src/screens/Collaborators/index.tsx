import { useState } from "react";
import { Box, Grid } from "@mui/material";

import { HeaderButton } from "../../components/Screen/HeaderButton";
import { FormCollaboratorsPersonalData } from "./FormCollaboratorsPersonalData";
import { FormCollaboratorsAddress } from "./FormCollaboratorsAddress";
import { ListCollaboratorsConstructions } from "./ListCollaboratorsConstructions";
import { ListCollaboratorsHistory } from "./ListCollaboratorsHistory";

export const Collaborators = () => {
  const [indexDisplay, setIndexDisplay] = useState(0);

  const handleChangeContent = (indexDisplay: number) => {
    setIndexDisplay(indexDisplay);
  };

  const displayContent = (indexDisplay: number) => {
    if (indexDisplay === 0) {
      return <FormCollaboratorsPersonalData />;
    }
    if (indexDisplay === 1) {
      return <FormCollaboratorsAddress />;
    }

    if (indexDisplay === 2) {
      return <ListCollaboratorsHistory />;
    }

    if (indexDisplay === 3) {
      return <ListCollaboratorsConstructions />;
    }
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#eff1f3",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <HeaderButton
          text="Dados Pessoais"
          isActive={indexDisplay === 0}
          onClick={() => handleChangeContent(0)}
        />

        <HeaderButton
          text="Endereço"
          isActive={indexDisplay === 1}
          onClick={() => handleChangeContent(1)}
        />

        <HeaderButton
          text="Histórico"
          isActive={indexDisplay === 2}
          onClick={() => handleChangeContent(2)}
        />

        <HeaderButton
          text="Obras Relacionadas"
          isActive={indexDisplay === 3}
          onClick={() => handleChangeContent(3)}
        />
      </Box>

      {displayContent(indexDisplay)}
    </Grid>
  );
};
