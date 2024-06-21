import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    container: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    headerTableContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
    },
    toolbarButton: {
      color: "#0076be",
      border: "1px solid #0076be",
      borderRadius: "4px",
    },
  };
});
