import { Button, Grid, Paper, Typography } from "@mui/material";
import { useStyles } from "./styles";

export function Navbar() {
  const { classes } = useStyles();
  return (
    <Grid item xs={12} lg={12}>
      <Paper className={classes.paper}>
        <div className={classes.actionBar}>
          <div className={classes.actionBarLeftContent}>
            <Typography className={classes.pageSubtitle}>
              Smile Company
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <Button type="submit" className={classes.buttonSave}>
              Salvar
            </Button>
          </div>
        </div>
      </Paper>
    </Grid>
  );
}
