import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    container: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    content: {
      marginBottom: 12,
    },
    statusContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    inputStatus: {
      marginBottom: 12,
    },
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
