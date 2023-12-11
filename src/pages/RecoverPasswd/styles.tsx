import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    paper: {
      color: theme.palette.text.secondary,
      zIndex: 2,
    },
    loginContentContainer: {
      display: "flex",
      width: 340,
      padding: 24,
      flexDirection: "column",
    },
    imageContainer: {
      width: 50,
    },
    image: {
      width: "100%",
    },
    formTitle: {
      color: "#444749",
      fontSize: 26,
      fontFamily: "Open Sans",
      fontWeight: 600,
      marginTop: 16,
    },
    formInstruction: {
      color: "#8F9193",
      fontFamily: "Open Sans",
      fontSize: 12,
    },
    buttonLogin: {
      fontSize: 18,
      fontWeight: 600,
      marginTop: 32,
      padding: "12px 30px",
      color: "#FFF",
      textTransform: "capitalize",
      transition: ".5s ease",
      backgroundColor: "#0076BE",
      "&:hover": {
        backgroundColor: "rgba(0,118,190,0.8)",
      },
      borderRadius: 5,
      textDecoration: "none",
    },
    buttonLoginText: {
      fontSize: 18,
      fontWeight: 600,
      fontFamily: "Open Sans",
    },
    buttonResetPasswd: {
      marginTop: 16,
      textTransform: "none",
      color: "#0076BE",
      cursor: "pointer",
      "&:hover": {
        color: "rgba(0,118,190,0.8)",
      },
    },
    buttonResetPasswdText: {
      fontSize: 18,
      fontWeight: 600,
      fontFamily: "Open Sans",
    },
  };
});
