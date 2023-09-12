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
    pageTitle: {
      color: "#5A5A5A",
      fontSize: 24,
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
    pageSubtitle: {
      color: "#252525",
      fontSize: 20,

      marginLeft: theme.spacing(2),
    },
    paper: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
    },
    formContainer: {
      padding: theme.spacing(1),
    },
    formSectionTitle: {
      color: "#6A6A6A",
      fontWeight: 700,
    },
    inputLabel: {
      marginBottom: theme.spacing(1),
      color: "#4E4E4E",
    },
    buttonBack: {
      borderRadius: "20%",
      color: "#FFF",
      transition: ".5 ease",
      backgroundColor: "#9c27b0",
      "&:hover": {
        backgroundColor: "rgba(156,39,176,0.8)",
      },
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
      backgroundColor: "#9c27b0",
      "&:hover": {
        backgroundColor: "rgba(156,39,176,0.8)",
      },
      borderRadius: 5,
      textDecoration: "none",
    },
    buttonDiscard: {
      width: 140,
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: theme.spacing(2),
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 30,
      paddingLeft: 30,
      color: "#FFF",
      textTransform: "capitalize",
      transition: ".5s ease",
      backgroundColor: "#FF3C40",
      "&:hover": {
        backgroundColor: "rgba(255,60,64,0.8)",
      },
      borderRadius: 5,
      textDecoration: "none",
    },
  };
});
