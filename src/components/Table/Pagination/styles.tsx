import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    containerPagination: {
      width: "100%",
      margin: "1rem 0",
      padding: "0 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };
});
