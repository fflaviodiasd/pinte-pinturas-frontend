import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  registerButton: {
    textTransform: "capitalize",
    backgroundColor: "#0076BE",
    color: "#FFFFFF",
    fontFamily: "Open Sans",
    fontWeight: 600,
    fontSize: "1rem",
    padding: "0.5rem 1rem",
    "&:hover": {
      backgroundColor: "#0076BE",
    },
  },
}));
