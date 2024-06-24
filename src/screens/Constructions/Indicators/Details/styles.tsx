import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    container: {
      marginLeft: 12,
      marginRight: 12,
      paddingBottom: theme.spacing(2),
    },
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
