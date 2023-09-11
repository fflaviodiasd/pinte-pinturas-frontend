import { makeStyles } from "tss-react/mui";

const drawerWidth = 240;

export const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
      height: "100vh",
    },
    appBar: {
      backgroundColor: "#6d1b7b",
      // zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      [theme.breakpoints.up("sm")]: {
        width: "100%",
        justifyContent: "flex-end",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    drawer: {
      zIndex: 1,
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      height: "100%",
    },
  };
});
