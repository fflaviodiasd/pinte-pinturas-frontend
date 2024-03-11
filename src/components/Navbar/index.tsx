import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useStyles } from "./styles";
import Breadcrumb from "../Breadcrumb";

export function Navbar({
  title,
  button,
  showBreadcrumb = false,
  breadcrumb,
}: any) {
  const { classes } = useStyles();
  return (
    <Grid item xs={12} lg={12}>
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
