/* eslint-disable react-refresh/only-export-components */
import { Button, Typography, Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme: Theme) => {
  return {
    titleContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#FAFAFA",
    },
    constructionFilterContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginRight: 12,
    },
    constructionFilterText: {
      marginRight: 12,
      color: "#0076BE",
      fontFamily: "Open Sans",
      fontWeight: 600,
      cursor: "pointer",
    },
    openFilterButton: {
      color: "#0076BE",
    },
    title: {
      color: "#2E3132",
      fontSize: 26,
      fontWeight: 600,
      fontFamily: "Open Sans",
      padding: theme.spacing(2),
    },
    tabContainer: {
      display: "flex",
      flexDirection: "row",
      padding: "20px 16px",
      backgroundColor: "#EEE",
      // [theme.breakpoints.down("xl")]: {
      //   padding: "20px 16px",
      // },
    },
    filterContainer: {
      gap: 8,
      display: "flex",
      justifyContent: "flex-end",
    },
    filterButton: {
      width: 100,
      color: "#0076BE",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Open Sans",
      backgroundColor: "#FFFFFF",
      border: "#0076BE 1px solid",
      borderRadius: 16,
      textTransform: "capitalize",
    },
  };
});

type TabProps = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

export function Tab({ text, isActive, onClick }: TabProps) {
  return (
    <Button
      style={{
        backgroundColor: isActive ? "#0076BE" : "",
        borderRadius: "8px",
        padding: "4px 16px",
      }}
      onClick={onClick}
    >
      <Typography
        style={{
          color: isActive ? "#FFF" : "#0076BE",
          fontFamily: "Open Sans",
          fontSize: "0.875rem",
          fontWeight: 600,
          textTransform: "capitalize",
        }}
      >
        {text}
      </Typography>
    </Button>
  );
}
