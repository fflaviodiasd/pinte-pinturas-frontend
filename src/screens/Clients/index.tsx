import { useState } from "react";
import { Box, Grid } from "@mui/material";

import { ListClients } from "./ListClients";
import { HeaderButton } from "../../components/Screen/HeaderButton";
import { NavbarClients } from "../../components/Navbar/Clients";
import { FormClientsGeneralData } from "./FormClientsGeneralData";
import { FormClientsAddress } from "./FormClientsAddress";

export const Clients = () => {
  const [indexDisplay, setIndexDisplay] = useState(0);

  const handleChangeContent = (indexDisplay: number) => {
    setIndexDisplay(indexDisplay);
  };

  const displayContent = (indexDisplay: number) => {
    if (indexDisplay === 0) {
      return <FormClientsGeneralData />;
    }
    if (indexDisplay === 1) {
      return <FormClientsAddress />;
    }

    if (indexDisplay === 2) {
      return <ListClients />;
    }

    if (indexDisplay === 3) {
      return <ListClients />;
    }
  };

  return (
    <Grid container sx={{ display: "flex", flexDirection: "column" }}>
      <NavbarClients />
      <Box sx={{ display: "flex" }}>
        <HeaderButton
          text="Dados Gerais"
          isActive={indexDisplay === 0}
          onClick={() => handleChangeContent(0)}
        />

        <HeaderButton
          text="Endereço"
          isActive={indexDisplay === 1}
          onClick={() => handleChangeContent(1)}
        />

        <HeaderButton
          text="Funcionário"
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
