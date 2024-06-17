/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { KeyboardArrowDownRounded as ArrowForwardIcon } from "@mui/icons-material/";

import {
  DashboardContext,
  DashboardContextProvider,
} from "../../contexts/DashboardContext";

import { ModalFilters } from "../Dashboard/components/ModalFilters";

import { GeneralData } from "./GeneralData";
import { FollowUp } from "./FollowUp";
import { Layout } from "./Layout";

import { Tab, useStyles } from "./styles";

export const Dashboard = () => {
  return (
    <DashboardContextProvider>
      <DashboardComponent />
    </DashboardContextProvider>
  );
};

function DashboardComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { classes } = useStyles();

  const { selectedConstruction } = useContext(DashboardContext);

  // const displayContent = () => {
  //   if (location.pathname.includes("acompanhamento")) {
  //     return <FollowUp />;
  //   } else if (location.pathname.includes("dados-gerais")) {
  //     return <GeneralData />;
  //   } else {
  //     return <Layout />;
  //   }
  // };

  const displayContent = () => {
    if (location.pathname.includes("dados-gerais")) {
      return <GeneralData />;
    } else {
      return <FollowUp />;
    }
  };

  const [open, setOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const shouldBeActive = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <Grid container>
      <Grid item sm={12} md={12} lg={12} className={classes.titleContainer}>
        <Typography className={classes.title}>Dashboard</Typography>

        <div className={classes.constructionFilterContainer}>
          <Typography
            className={classes.constructionFilterText}
            onClick={() => {
              setSelectedFilter("construction");
              handleClickOpen();
            }}
          >
            {selectedConstruction.name
              ? selectedConstruction.name
              : "Selecionar Obra"}
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={() => {
              setSelectedFilter("construction");
              handleClickOpen();
            }}
          >
            <ArrowForwardIcon
              className={classes.openFilterButton}
              fontSize="small"
            />
          </IconButton>
        </div>
      </Grid>
      <Grid item sm={12} md={12} lg={12} className={classes.tabContainer}>
        <Grid
          item
          sm={2}
          md={1}
          lg={3}
          style={{
            display: "flex",
            gap: 8,
          }}
        >
          {/* <Tab
            text="Layout"
            isActive={
              !shouldBeActive("acompanhamento") &&
              !shouldBeActive("dados-gerais")
            }
            onClick={() => navigate(`/dashboard`)}
          /> */}
          <Tab
            text="Acompanhamento"
            isActive={shouldBeActive("acompanhamento")}
            onClick={() => navigate(`/dashboard/acompanhamento`)}
          />
          <Tab
            text="Dados Gerais"
            isActive={shouldBeActive("dados-gerais")}
            onClick={() => navigate(`/dashboard/dados-gerais`)}
          />
        </Grid>
        <Grid item sm={2} md={3} lg={1} />
        <Grid item sm={8} md={8} lg={8} className={classes.filterContainer}>
          {shouldBeActive("dados-gerais") ? (
            <Button
              className={classes.filterButton}
              onClick={() => {
                setSelectedFilter("employee");
                handleClickOpen();
              }}
            >
              Funcionário
            </Button>
          ) : (
            listFilters.map((filter) => {
              return (
                <Button
                  key={filter.filterName}
                  className={classes.filterButton}
                  onClick={() => {
                    setSelectedFilter(filter.filterName);
                    handleClickOpen();
                  }}
                >
                  {filter.text}
                </Button>
              );
            })
          )}
        </Grid>
      </Grid>

      {displayContent()}

      <ModalFilters
        open={open}
        handleClose={handleClose}
        filter={selectedFilter}
      />
    </Grid>
  );
}

const listFilters = [
  { text: "Checklist", filterName: "checklist" },
  { text: "Pacotes", filterName: "package" },
  { text: "Status", filterName: "status" },
  { text: "Usuário", filterName: "user" },
  { text: "Funcionário", filterName: "employee" },
  { text: "Medição", filterName: "measurement" },
];
