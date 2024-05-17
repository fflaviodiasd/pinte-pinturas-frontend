import { Button } from "@mui/material";

import { useStyles } from "./styles";

type ActionButtonsProps = {
  onClear: () => void;
  onApply: () => void;
  disableApply?: boolean;
};

export const ActionButtons = ({
  onApply,
  onClear,
  disableApply,
}: ActionButtonsProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.buttonsContainer}>
      <Button variant="text" className={classes.clearButton} onClick={onClear}>
        Limpar
      </Button>
      <Button
        variant="contained"
        className={classes.applyButton}
        onClick={onApply}
        disabled={disableApply}
      >
        Aplicar
      </Button>
    </div>
  );
};
