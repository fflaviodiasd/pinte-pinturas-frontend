import { useContext } from "react";
import { Avatar, Grid, Typography } from "@mui/material";
// import { TimerRounded as TimerIcon } from "@mui/icons-material";

import { DashboardContext } from "../../../../../contexts/DashboardContext";

import { LabelColor, useStyles } from "./styles";

export function EmployeeCarousel() {
  const { classes } = useStyles();
  const { listInteractions } = useContext(DashboardContext);

  return (
    <Grid lg={12} className={classes.container}>
      <div className={classes.content}>
        {listInteractions.map((interaction) => (
          <div className={classes.cardContainer}>
            <div className={classes.cardContent}>
              <Avatar alt="" src="" className={classes.avatar} />
              <div className={classes.userData}>
                <Typography noWrap className={classes.userName}>
                  {interaction.responsible_action}
                </Typography>
                {/* <div className={classes.userTimeContainer}>
                  <TimerIcon className={classes.userTimeIcon} />
                  <Typography className={classes.userTimeText}>
                    146h 32m
                  </Typography>
                </div> */}
              </div>
            </div>

            <div className={classes.labelContainer}>
              <div className={classes.label}>
                <LabelColor color="rgb(255,152,0)" />
                <Typography className={classes.labelText}>
                  {interaction.status.liberada}
                </Typography>
              </div>
              <div className={classes.label}>
                <LabelColor color="rgb(76,175,80)" />
                <Typography className={classes.labelText}>
                  {interaction.status.iniciada}
                </Typography>
              </div>
              <div className={classes.label}>
                <LabelColor color="rgb(33,150,243)" />
                <Typography className={classes.labelText}>
                  {interaction.status.finalizada}
                </Typography>
              </div>
              <div className={classes.label}>
                <LabelColor color="rgb(103,58,183)" />
                <Typography className={classes.labelText}>
                  {interaction.status.entregue}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Grid>
  );
}
