import { Typography } from "@mui/material";

import { BackgroundAvatar } from "../../../../../components/BackgroundAvatar";

import { useStyles } from "./styles";

type MainSupervisorInfoProps = {
  responsiblePrimary: {
    avatar: string;
    id: number;
    inclusion_date: string;
    name: string;
    profile: string;
  };
};

export const MainSupervisorInfo = ({
  responsiblePrimary,
}: MainSupervisorInfoProps) => {
  const { classes } = useStyles();

  const initials = responsiblePrimary.name
    ? getInitials(responsiblePrimary.name)
    : "";

  return (
    <div className={classes.mainSupervisorContainer}>
      <BackgroundAvatar avatarName={initials} />

      <div className={classes.mainSupervisorInfo}>
        <Typography className={classes.mainSupervisorInfoLabel}>
          Nome Completo
        </Typography>
        <Typography className={classes.mainSupervisorInfoText}>
          {responsiblePrimary.name}
        </Typography>
      </div>
      <div className={classes.mainSupervisorInfo}>
        <Typography className={classes.mainSupervisorInfoLabel}>
          Cargo
        </Typography>
        <Typography className={classes.mainSupervisorInfoText}>
          {responsiblePrimary.name}
        </Typography>
      </div>
      <div className={classes.mainSupervisorInfo}>
        <Typography className={classes.mainSupervisorInfoLabel}>
          Data de Inclusão
        </Typography>
        <Typography className={classes.mainSupervisorInfoText}>
          {responsiblePrimary.inclusion_date}
        </Typography>
      </div>
      <div className={classes.mainSupervisorInfo}>
        <Typography className={classes.mainSupervisorInfoLabel}>
          Perfil
        </Typography>
        <Typography className={classes.mainSupervisorInfoText}>
          {responsiblePrimary.profile}
        </Typography>
      </div>
    </div>
  );
};

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter((n) => n !== "")
    .map((n) => n[0])
    .join("");
};
