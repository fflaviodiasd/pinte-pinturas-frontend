import { makeStyles } from "tss-react/mui";
export const useStyles = makeStyles()((theme) => ({
  primaryButton: {
    fontFamily: "Open Sans",
    fontSize: 16,
    fontWeight: 600,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 22,
    paddingLeft: 22,
    color: "#FFF",
    textTransform: "capitalize",
    transition: ".5s ease",
    backgroundColor: "#0076BE",
    "&:hover": {
      backgroundColor: "#0076BE",
    },
    borderRadius: 5,
    textDecoration: "none",
  },
  secondaryButton: {
    cursor: "pointer",
  },
}));
