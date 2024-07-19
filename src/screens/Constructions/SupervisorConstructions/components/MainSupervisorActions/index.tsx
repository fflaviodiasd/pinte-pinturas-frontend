import { IconButton, Tooltip } from "@mui/material";
import {
  Autorenew as AutorenewIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

import { useStyles } from "./styles";
import { UserContext } from "../../../../../contexts/UserContext";
import { useContext } from "react";

type MainSupervisorActionsProps = {
  handleChangeSupervisor: () => void;
  handleDeleteSupervisor: () => void;
};

export const MainSupervisorActions = ({
  handleChangeSupervisor,
  handleDeleteSupervisor,
}: MainSupervisorActionsProps) => {
  const { classes } = useStyles();
  const { user } = useContext(UserContext);

  return (
    <div>
      <Tooltip title="Alterar encarregado">
        <IconButton
          color="primary"
          className={classes.changeMainSupervisorButton}
          onClick={handleChangeSupervisor}
          disabled={user.type === 5 || user.type === 6 || user.type === 8}
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
