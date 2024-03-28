import { Delete } from "@mui/icons-material";
import { useStyles } from "./styles";

export function SnackbarDeleteIcon() {
  const { classes } = useStyles();

  return (
    <div className={classes.containerDeleteIcon}>
      <Delete className={classes.deleteIcon} />
    </div>
  );
}
