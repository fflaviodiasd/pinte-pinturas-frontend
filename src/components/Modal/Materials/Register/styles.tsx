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
}));
