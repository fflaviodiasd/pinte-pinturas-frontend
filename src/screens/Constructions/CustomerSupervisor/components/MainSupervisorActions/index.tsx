import { IconButton, Tooltip } from "@mui/material";
import {
  Autorenew as AutorenewIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { useStyles } from "./styles";

type MainSupervisorActionsProps = {
  handleChangeSupervisor: () => void;
  handleDeleteSupervisor: () => void;
};

export const MainSupervisorActions = ({
  handleChangeSupervisor,
  handleDeleteSupervisor,
}: MainSupervisorActionsProps) => {
  const { classes } = useStyles();

  return (
    <div>
      <Tooltip title="Alterar encarregado">
        <IconButton
          color="primary"
          className={classes.changeMainSupervisorButton}
          onClick={handleChangeSupervisor}
        >
          <AutorenewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remover encarregado">
        <IconButton
          className={classes.removeMainSupervisorButton}
          onClick={handleDeleteSupervisor}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
