import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()(() => {
  return {
    loadingContainer: {
      display: "flex",
      flex: 1,
      marginTop: 20,
      justifyContent: "center",
    },
    inputsContainer: {
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
    },
    cancelButton: {
      marginRight: 12,
      color: "#0076be",
      fontFamily: "Open Sans",
      fontWeight: 600,
      textTransform: "capitalize",
      padding: "12px 22px",
      borderColor: "#0076be",
      borderWidth: 1,
      borderStyle: "solid",
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

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
`;
