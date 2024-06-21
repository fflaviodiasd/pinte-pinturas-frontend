import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    container: {
      paddingLeft: 12,
      paddingRight: 12,
    },
    content: {
      marginBottom: 12,
    },
  };
});
