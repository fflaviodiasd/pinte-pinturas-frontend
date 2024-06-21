import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    buttonsContainer: {
      display: "flex",
      justifyContent: "space-evenly",
    },
    clearButton: {
      width: 100,
      color: "#0076BE",
      fontsize: 14,
      fontWeight: 600,
      fontFamily: "Open Sans",
      textTransform: "capitalize",
    },
    applyButton: {
      width: 100,
      backgroundColor: "#0076BE",
      fontsize: 14,
      fontWeight: 600,
      fontFamily: "Open Sans",
      textTransform: "capitalize",
    },
  };
});
