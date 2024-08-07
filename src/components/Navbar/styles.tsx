import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    actionBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
    },
    actionBarLeftContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    pageSubtitle: {
      color: "#2E3132",
      fontSize: 26,
      fontWeight: 600,
      fontFamily: "Open Sans",
      margin: theme.spacing(1),
    },
    paper: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
    },

    buttonSave: {
      width: 140,
      fontSize: 14,
      fontWeight: "bold",
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 30,
      paddingLeft: 30,
      color: "#FFF",
      textTransform: "capitalize",
      transition: ".5s ease",
      backgroundColor: "#0076BE",
      "&:hover": {
        backgroundColor: "#0076BE",
      },
      borderRadius: 5,
      textDecoration: "none",
    },
  };
});
