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
    graphContainer: {
      backgroundColor: "#FFF",
      paddingRight: 16,
      overflow: "auto",
      height: "calc(100vh - 164px)",
      scrollbarWidth: "none",
    },
  };
});
