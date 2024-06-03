import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    titleContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#FAFAFA",
    },
    title: {
      color: "#2E3132",
      fontSize: 26,
      fontWeight: 600,
      fontFamily: "Open Sans",
      padding: theme.spacing(2),
    },
    registerButton: {
      fontFamily: "Open Sans",
      fontSize: 16,
      fontWeight: 600,
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 22,
      paddingLeft: 22,
      marginLeft: 12,
      color: "#FFF",
      textTransform: "capitalize",
      backgroundColor: "#0076BE",
      borderRadius: 5,
      textDecoration: "none",
    },
    tableContainer: {
      paddingLeft: 12,
      paddingRight: 12,
      marginTop: 12,
    },
  };
});
