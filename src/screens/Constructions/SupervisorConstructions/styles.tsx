import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    container: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      backgroundColor: "#FFF",
    },
    MainSupervisorHeader: {
      display: "flex",
      justifyContent: "space-between",
      paddingLeft: 12,
      paddingTop: 12,
      paddingRight: 12,
    },
    addMainSupervisorButtonContainer: {
      display: "flex",
      justifyContent: "center",
      padding: 12,
    },
    addMainSupervisorButton: {
      fontSize: 14,
      fontFamily: "Open Sans",
      fontWeight: 600,
      textTransform: "capitalize",
    },
    mainSupervisorContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
    },
    mainSupervisorInfo: {
      width: 300,
      marginLeft: 12,
      paddingLeft: 12,
      backgroundColor: "#eff1f3",
      borderRadius: 8,
    },
    mainSupervisorInfoLabel: {
      fontSize: 14,
      fontFamily: "Open Sans",
      textTransform: "capitalize",
      color: "#cbcdcf",
    },
    mainSupervisorInfoText: {
      fontSize: 16,
      fontFamily: "Open Sans",
      textTransform: "capitalize",
    },
    changeMainSupervisorButton: {
      border: "1px solid",
      borderColor: "#0076be",
      borderRadius: "8px",
      marginRight: 12,
      "&:hover": {
        backgroundColor: "rgba(0, 118, 190, 0.04)",
      },
    },
    removeMainSupervisorButton: {
      border: "1px solid #D32F2F",
      borderRadius: "8px",
      color: "#D32F2F",
      "&:hover": {
        backgroundColor: "rgba(211, 47, 47, 0.1)",
      },
      "& .MuiSvgIcon-root": {
        color: "#D32F2F",
      },
    },
  };
});
