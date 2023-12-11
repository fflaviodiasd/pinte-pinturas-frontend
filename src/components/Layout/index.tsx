import { ReactNode } from "react";
import { Grid } from "@mui/material";

import { useStyles } from "./styles";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { classes } = useStyles();

  return (
    <Grid container>
      <Grid item lg={12} className={classes.formContainer}>
        <div className={classes.asideColorsContainer}>
          <div className={classes.redColor} />
          <div className={classes.greenColor} />
          <div className={classes.yellowColor} />
          <div className={classes.blueColor} />
        </div>
        {children}
      </Grid>
    </Grid>
  );
};
