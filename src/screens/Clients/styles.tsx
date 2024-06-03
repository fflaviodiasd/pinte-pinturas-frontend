/* eslint-disable react-refresh/only-export-components */
import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()((theme: Theme) => {
  return {
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#FFF",
      padding: theme.spacing(2),
    },
    titleContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      color: "#2E3132",
      fontSize: 26,
      fontWeight: 600,
      fontFamily: "Open Sans",
    },
    tradingNameContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    tradingNameText: {
      color: "#252525",
      fontSize: 20,
      marginLeft: theme.spacing(2),
    },
    buttonSave: {
      fontSize: 16,
      fontWeight: 600,
      fontFamily: "Open Sans",
      padding: "12px 22px",
      color: "#FFF",
      textTransform: "capitalize",
      borderRadius: 5,
    },
    tabsContainer: {
      display: "flex",
      backgroundColor: "#eff1f3",
      paddingTop: "1rem",
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
    formContainer: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      padding: 6,
      backgroundColor: "#FFF",
    },
    fieldContainer: {
      padding: 6,
    },
    tableContainer: {
      paddingLeft: 12,
      paddingRight: 12,
      marginTop: 12,
    },
  };
});

export const TabsContainer = styled.div`
  display: flex;
  background-color: #eff1f3;
  padding-top: 1rem;
  padding-left: 16px;
`;
