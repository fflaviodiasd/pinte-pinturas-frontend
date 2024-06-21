/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    // container: {
    //   marginLeft: theme.spacing(2),
    //   marginRight: theme.spacing(2),
    //   paddingBottom: theme.spacing(2),
    // },
    headerTableContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      marginTop: 12,
    },
    tableButtonsContainer: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
    },
    toolbarButton: {
      color: "#0076be",
      border: "1px solid #0076be",
      borderRadius: "4px",
    },
    nameCellText: {
      fontSize: 16,
      fontFamily: "Open Sans",
      marginLeft: 12,
    },
  };
});
