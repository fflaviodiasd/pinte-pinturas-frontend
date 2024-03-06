import { Button, Grid, Paper, Typography } from "@mui/material";
import { useStyles } from "./styles";

export function Navbar({ title, button }: any) {
  const { classes } = useStyles();
  return (
    <Grid item xs={12} lg={12}>
      <Paper className={classes.paper}>
        <div className={classes.actionBar}>
          <div className={classes.actionBarLeftContent}>
            <Typography className={classes.pageSubtitle}>{title}</Typography>
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
