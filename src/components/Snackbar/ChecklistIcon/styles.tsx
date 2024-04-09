import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    buttonChecklistIcon: {
      padding: "0.5rem",
      backgroundColor: "#0076BE",
      borderRadius: "0.5rem",
      cursor: "pointer",
      color: "white",
      border: "none",
    },
    containerChecklistIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.3rem",
    },
    checklistIcon: {
      color: "white",
    },
  };
});
