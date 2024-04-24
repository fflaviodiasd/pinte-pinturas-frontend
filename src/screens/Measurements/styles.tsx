/* eslint-disable react-refresh/only-export-components */
import { Button, Typography, Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme: Theme) => {
  return {
    titleContainer: {
      backgroundColor: "#FAFAFA",
    },
    title: {
      color: "#2E3132",
      fontSize: 26,
      fontWeight: 600,
      fontFamily: "Open Sans",
      padding: theme.spacing(2),
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
        width: 86,
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
