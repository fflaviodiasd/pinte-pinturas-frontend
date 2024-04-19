import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()((theme) => {
  return {
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
  };
});

export const TabsContainer = styled.div`
  display: flex;
  background-color: #eff1f3;
  padding-top: 1rem;
  padding-left: 16px;
`;
