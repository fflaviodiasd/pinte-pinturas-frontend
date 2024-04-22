import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()((theme) => {
  return {
    paper: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
    },
    searchBarContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",

      padding: 16,
    },
  };
});

export const GroupHeader = styled.div`
  position: sticky;
  top: -8px;
  padding: 4px 10px;
  color: #0076be;
  background-color: #def4ff;
  font-family: "Open Sans";
  font-weight: 600;
`;

export const GroupItems = styled.ul`
  padding: 0;
  color: #2e3132;
  font-family: "Open Sans";
  font-weight: 600;
`;
