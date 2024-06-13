import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => ({
  underlinedTitle: {
    padding: "1rem",
    color: "#2E3132",
    fontFamily: "Open Sans",
    fontWeight: "600",
    fontSize: "1.375rem",
    lineHeight: "1.875rem",
  },
  underlinedBorder: {
    borderBottom: "2px solid #0076BE",
  },
}));
