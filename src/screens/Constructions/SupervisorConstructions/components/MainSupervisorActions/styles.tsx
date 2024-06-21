/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
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
