import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    headerContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#FFF",
      padding: theme.spacing(2),
    },
    title: {
      color: "#2E3132",
      fontSize: 26,
      fontWeight: 600,
      fontFamily: "Open Sans",
    },
    tableContainer: {
      paddingLeft: 12,
      paddingRight: 12,
      marginTop: 12,
    },
  };
});
