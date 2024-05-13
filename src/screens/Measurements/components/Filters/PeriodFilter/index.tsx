import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type PeriodFilterProps = {
  handleClose: () => void;
};

export const PeriodFilter = ({ handleClose }: PeriodFilterProps) => {
  const { classes } = useStyles();

  const handleApply = () => {
    handleClose();
  };

  const handleClear = () => {};

  return (
    <div className={classes.container}>
      <div className={classes.content}></div>
      <ActionButtons onApply={handleApply} onClear={handleClear} />
    </div>
  );
};
