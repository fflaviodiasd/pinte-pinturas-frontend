import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    content: {
      display: "flex",
      flexDirection: "row",
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      backgroundColor: "#EEE",
      flex: 1,
    },
  };
});
