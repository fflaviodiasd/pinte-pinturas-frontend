import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    successTitle: {
      display: "flex",
      alignItems: "center",
    },
    successTitleIcon: {
      color: "#4CAF50",
      marginRight: 4,
    },
    successTitleText: {
      color: "#4CAF50",
      fontFamily: "Open Sans",
      fontSize: 18,
      fontWeight: 600,
    },
    successTitleMessage: {
      color: "#444744",
      fontSize: 16,
      fontWeight: 300,
      fontFamily: "Open Sans",
    },
    buttonBack: {
      fontSize: 18,
      fontWeight: 600,
      padding: "8px 22px",
      color: "#FFF",
      textTransform: "none",
      transition: ".5s ease",
      backgroundColor: "#0076BE",
      "&:hover": {
        backgroundColor: "rgba(0,118,190,0.8)",
      },
      borderRadius: 5,
      textDecoration: "none",
    },
    buttonBackText: {
      fontSize: 18,
      fontWeight: 600,
      fontFamily: "Open Sans",
    },
    warningTitleIcon: {
      color: "#FF9800",
      marginRight: 4,
    },
    warningTitleText: {
      color: "#FF9800",
      fontFamily: "Open Sans",
      fontSize: 18,
      fontWeight: 600,
    },
  };
});
