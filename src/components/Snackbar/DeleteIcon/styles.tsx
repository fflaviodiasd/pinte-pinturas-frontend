import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    containerDeleteIcon: {
      padding: "0.5rem",
      backgroundColor: "red",
      borderRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    deleteIcon: {
      color: "white",
    },
  };
});
