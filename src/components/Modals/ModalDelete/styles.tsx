import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    checkboxContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      marginTop: 8,
    },
    checkboxItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    checkboxInput: {
      width: 60,
      marginLeft: 8,
    },
    inputLabel: {
      marginBottom: theme.spacing(1),
      color: "#4E4E4E",
    },
    buttonBack: {
      width: 200,
      fontSize: 14,
      fontWeight: "bold",
      marginRight: 8,
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

    buttonDelete: {
      width: 200,
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 8,
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 30,
      paddingLeft: 30,
      color: "#2EA949",
      textTransform: "capitalize",
      transition: ".5s ease",
      "&:hover": {
        color: "#FFF",
        backgroundColor: "rgba(46,169,73,0.8)",
      },
      borderRadius: 5,
      textDecoration: "none",
    },
  };
});
