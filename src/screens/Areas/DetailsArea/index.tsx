/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Tab, Tabs } from "@mui/material";

import { TitleScreen } from "../../../components/TitleScreen";

import { ListAreas } from "../../Areas/ListAreas";
import { FormArea } from "./FormArea";
import { useStyles } from "./styles";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export const DetailsArea = () => {
  const { classes } = useStyles();
  const { id } = useParams();

  const [index, setIndex] = useState(0);

  const handleChangeIndex = (_: React.SyntheticEvent, newIndex: number) => {
    setIndex(newIndex);
  };

  useEffect(() => {
    if (id) {
      console.log(id);
      setIndex(0);
    }
  }, [id]);

  return (
    <Grid container spacing={2}>
      <TitleScreen title="Área" />

      <Grid item lg={12}>
        <Tabs
          value={index}
          onChange={handleChangeIndex}
          variant="fullWidth"
          TabIndicatorProps={{ style: { backgroundColor: "#9c27b0" } }}
          textColor="secondary"
        >
          <Tab
            label="Dados da área"
            {...a11yProps(0)}
            className={classes.tab}
          />
          <Tab label="Áreas" {...a11yProps(1)} className={classes.tab} />
        </Tabs>
      </Grid>

      {index === 0 && (
        <Grid item lg={12}>
          <FormArea />
        </Grid>
      )}
      {index === 1 && (
        <Grid item lg={12}>
          <ListAreas />
        </Grid>
      )}
    </Grid>
  );
};
