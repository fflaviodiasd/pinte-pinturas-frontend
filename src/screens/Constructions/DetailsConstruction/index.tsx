/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Tab, Tabs } from "@mui/material";
import { TitleScreen } from "../../../components/TitleScreen";
import { useEffect, useState } from "react";
import { FormConstruction } from "./FormConstruction";

import { useStyles } from "./styles";
import { useParams } from "react-router-dom";
import { useConstructions } from "../../../hooks/useConstructions";
import { ConstructionListAreas } from "./ConstructionListAreas";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export const DetailsConstruction = () => {
  const { classes } = useStyles();

  const [index, setIndex] = useState(0);

  const handleChangeIndex = (_: React.SyntheticEvent, newIndex: number) => {
    setIndex(newIndex);
  };

  return (
    <Grid container spacing={2}>
      <TitleScreen title="Obra" />

      <Grid item lg={12}>
        <Tabs
          value={index}
          onChange={handleChangeIndex}
          variant="fullWidth"
          TabIndicatorProps={{
            style: { backgroundColor: "#9c27b0" },
          }}
          textColor="secondary"
        >
          <Tab
            label="Dados da obra"
            {...a11yProps(0)}
            className={classes.tab}
          />
          <Tab label="Áreas" {...a11yProps(1)} className={classes.tab} />
        </Tabs>
      </Grid>

      {index === 0 && (
        <Grid item lg={12}>
          <FormConstruction />
        </Grid>
      )}
      {index === 1 && (
        <Grid item lg={12}>
          <ConstructionListAreas />
        </Grid>
      )}
    </Grid>
  );
};
