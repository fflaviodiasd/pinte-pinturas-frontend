import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  dialogContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  dialogContentText: {
    letterSpacing: "2px",
    fontFamily: "Open Sans",
    fontWeight: 400,
    fontSize: "1rem",
    color: "#444744",
  },
  dialogActions: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: 12,
  },
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
