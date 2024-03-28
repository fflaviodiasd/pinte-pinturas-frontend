import { Delete } from "@mui/icons-material";
import { useStyles } from "./styles";
import { Tooltip } from "@mui/material";

type DeleteIconProps = {
  title: string;
};

export function SnackbarDeleteIcon({ title }: DeleteIconProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.containerDeleteIcon}>
      <Tooltip title={title}>
        <Delete className={classes.deleteIcon} />
      </Tooltip>
    </div>
  );
}
