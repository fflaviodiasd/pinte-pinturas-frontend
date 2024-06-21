import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  container: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  teamsTitle: {
    padding: "1rem",
    color: "#2E3132",
    fontFamily: "Open Sans",
    fontWeight: "600",
    fontSize: "1.375rem",
    lineHeight: "1.875rem",
  },
  teamsBorder: {
    borderBottom: "2px solid #0076BE",
  },
}));
