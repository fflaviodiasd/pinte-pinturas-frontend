import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    paper: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
    },
    formContainer: {
      padding: theme.spacing(1),
    },
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
      color: "#252525",
      fontSize: 20,

      marginLeft: theme.spacing(2),
    },

    buttonSave: {
      width: 190,
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
