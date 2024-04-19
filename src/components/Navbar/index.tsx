import { Box, Grid, Paper, Typography } from "@mui/material";
import { useStyles } from "./styles";
import { ReactElement } from "react";

type NavbarProps = {
  title: string;
  button?: ReactElement;
  showBreadcrumb?: boolean;
  breadcrumb?: ReactElement;
};

export function Navbar({
  title,
  button,
  showBreadcrumb = false,
  breadcrumb,
}: NavbarProps) {
  const { classes } = useStyles();

  return (
    <Grid container>
      <Paper className={classes.paper}>
        <div className={classes.actionBar}>
          <div className={classes.actionBarLeftContent}>
            {showBreadcrumb ? (
              <Box style={{ display: "flex", flexDirection: "column" }}>
                {breadcrumb}
                <Typography className={classes.pageSubtitle}>
                  {title}
                </Typography>
              </Box>
            ) : (
              <Typography className={classes.pageSubtitle}>{title}</Typography>
            )}
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            {button}
          </div>
        </div>
      </Paper>
    </Grid>
  );
}
