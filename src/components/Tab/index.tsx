import { Button, Typography } from "@mui/material";

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
        borderRadius: "8px 8px 0 0",
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
