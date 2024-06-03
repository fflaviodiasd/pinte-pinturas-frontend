import { Avatar, Grid, Typography } from "@mui/material";
import { TimerRounded as TimerIcon } from "@mui/icons-material";

import { LabelColor, useStyles } from "./styles";

export function EmployeeCarousel() {
  const { classes } = useStyles();

  return (
    <Grid lg={12} className={classes.container}>
      <div className={classes.content}>
        {listEmployees.map((employee) => (
          <div className={classes.cardContainer}>
            <div className={classes.cardContent}>
              <Avatar alt="" src="" className={classes.avatar} />
              <div className={classes.userData}>
                <Typography noWrap className={classes.userName}>
                  {employee}
                </Typography>
                <div className={classes.userTimeContainer}>
                  <TimerIcon className={classes.userTimeIcon} />
                  <Typography className={classes.userTimeText}>
                    146h 32m
                  </Typography>
                </div>
              </div>
            </div>

            <div className={classes.labelContainer}>
              {labelsList.map((label) => (
                <div className={classes.label}>
                  <LabelColor color={label.color} />
                  <Typography className={classes.labelText}>
                    {label.quantity}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Grid>
  );
}

const labelsList = [
  {
    quantity: 432,
    color: "rgb(255,152,0)",
  },
  {
    quantity: 152,
    color: "rgb(76,175,80)",
  },
  {
    quantity: 1230,
    color: "rgb(33,150,243)",
  },
  {
    quantity: 398,
    color: "rgb(103,58,183)",
  },
];

const listEmployees = [
  "Franco Jácomo Aragão Estrada",
  "Franco Jácomo Aragão Estrada",
  "Franco Jácomo Aragão Estrada",
  "Franco Jácomo Aragão Estrada",
  "Franco Jácomo Aragão Estrada",
  "Franco Jácomo Aragão Estrada",
  "Franco Jácomo Aragão Estrada",
  "Franco Jácomo Aragão Estrada",
];
