/* eslint-disable react-refresh/only-export-components */
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    content: {
      display: "flex",
      flexDirection: "row",
      padding: 16,
      backgroundColor: "#EEE",
    },
  };
});
