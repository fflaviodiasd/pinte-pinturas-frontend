import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type StepFilterProps = {
  handleClose: () => void;
};

export const StepFilter = ({ handleClose }: StepFilterProps) => {
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
