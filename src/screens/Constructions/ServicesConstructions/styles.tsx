import { makeStyles } from "tss-react/mui";

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
    toolbarButton: {
      color: "#0076be",
      border: "1px solid #0076be",
      borderRadius: "4px",
    },
  };
});
