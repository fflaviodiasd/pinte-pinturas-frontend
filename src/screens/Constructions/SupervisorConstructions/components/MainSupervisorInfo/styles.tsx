/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
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
  };
});
