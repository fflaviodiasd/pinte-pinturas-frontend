/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Typography, Tab, Tabs } from "@mui/material";
import { TitleScreen } from "../../../components/TitleScreen";
import { useConstructions } from "../../../hooks/useConstructions";
import { useState } from "react";
import { FormConstruction } from "./FormConstruction";

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export const DetailsConstruction = () => {
  const [index, setIndex] = useState(0);

  const handleChangeIndex = (_: React.SyntheticEvent, newIndex: number) => {
    setIndex(newIndex);
  };

  return (
    <Grid container spacing={2}>
      <TitleScreen
        // title={`Obra${
        //   constructionData.name ? ` - ${constructionData.name}` : ""
        // }`}
        title="Obra"
      />

      <Grid item lg={12}>
        <Tabs
          value={index}
          onChange={handleChangeIndex}
          variant="fullWidth"
          TabIndicatorProps={{ style: { backgroundColor: "#9c27b0" } }}
        >
          <Tab
            label="Dados da obra"
            {...a11yProps(0)}
            style={{ fontWeight: 700, color: "#9c27b0" }}
          />
          <Tab
            label="Áreas"
            {...a11yProps(1)}
            style={{ fontWeight: 700, color: "#9c27b0" }}
          />
        </Tabs>
      </Grid>

      {index === 0 && (
        <Grid item lg={12}>
          <FormConstruction />
        </Grid>
      )}
      {index === 1 && (
        <Grid item lg={12}>
          <Typography>Item 2</Typography>
        </Grid>
      )}
    </Grid>
  );
};

const model = [
  {
    id: 1,
    name: "Torre 01",
    type: "Torre",
    level: 1,
    child_areas: [
      {
        id: "2",
        name: "Andar 01",
        type: "Andar",
        level: 2,
      },
      {
        id: "3",
        name: "Andar 02",
        type: "Andar",
        level: 2,
      },
    ],
  },
];
