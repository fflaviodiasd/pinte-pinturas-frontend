/* eslint-disable react-refresh/only-export-components */
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    filterContainer: {
      width: 250,
      justifySelf: "flex-end",
    },
    filterTitle: {
      color: "#2E3132",
      fontSize: 18,
      fontWeight: 600,
      fontFamily: "Open Sans",
    },
    filterTitleContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "4px 12px",
    },
    closeFilterButton: {
      color: "#0076BE",
    },
  };
});
