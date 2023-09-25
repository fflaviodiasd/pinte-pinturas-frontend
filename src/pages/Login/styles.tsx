import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "90vh",
    },
    paper: {
      color: theme.palette.text.secondary,
      marginTop: 12,
    },
    loginContentContainer: {
      display: "flex",
      width: 400,
      padding: 24,
      flexDirection: "column",
    },
    inputLabel: {
      marginBottom: theme.spacing(1),
      color: "#482880",
      fontWeight: 600,
    },
    buttonLogin: {
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 24,
      padding: "12px 30px",
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
    resetPasswdText: {
      marginLeft: 12,
      fontSize: 14,
      color: "#9c27b0",
      cursor: "pointer",
      "&:hover": {
        color: "rgba(156,39,176,0.8)",
      },
    },
    resetPasswdContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
    },
  };
});
