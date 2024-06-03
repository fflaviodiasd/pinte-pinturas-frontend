/* eslint-disable react-refresh/only-export-components */
import { makeStyles } from "tss-react/mui";
import styled from "styled-components";
import { Grid } from "@mui/material";

export const useStyles = makeStyles()((theme) => {
  return {
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#FFF",
      padding: theme.spacing(2),
    },
    title: {
      color: "#2E3132",
      fontSize: 26,
      fontWeight: 600,
      fontFamily: "Open Sans",
    },
    tabsContainer: {
      paddingTop: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
    tabButton: {
      margin: "1rem",
      height: "100%",
      borderRadius: "0.5rem 0.5rem 0px 0px",
      padding: "0.25rem 1rem 0.25rem 1rem",
      fontWeight: 600,
      border: "none",
      backgroundColor: "#0076BE",
      color: "#FFF",
      fontFamily: "Open Sans, sans-serif",
      fontSize: "0.875rem",
      textTransform: "capitalize",
    },
    contentContainer: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
    },
  };
});

export const TabsContainer = styled(Grid)`
  display: flex;
  background-color: #eff1f3;
  /* padding-top: 1rem; */
  /* padding-left: 16px; */
`;
