import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    container: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      overflow: "auto",
    },
  };
});
