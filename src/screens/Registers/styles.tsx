import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    optionContainer: {
      marginBottom: 16,
      backgroundColor: "#af52bf",
      padding: 12,
      borderRadius: 10,
      color: "#6d1b7b",
      cursor: "pointer",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "#af52bf",
      transition: ".3 ease",
      "&:hover": {
        backgroundColor: "#FFF",
        color: "#af52bf",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#af52bf",
      },
    },
  };
});
