import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type DailyFilterProps = {
  handleClose: () => void;
};

export const DailyFilter = ({ handleClose }: DailyFilterProps) => {
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
