/* eslint-disable react-refresh/only-export-components */
import { Theme } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme: Theme) => {
  return {
    formContainer: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      padding: 6,
      backgroundColor: "#FFF",
    },
    fieldContainer: {
      padding: 6,
    },
    tableContainer: {
      paddingLeft: 12,
      paddingRight: 12,
    },
  };
});
