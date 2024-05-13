import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type PackageFilterProps = {
  handleClose: () => void;
};

export const PackageFilter = ({ handleClose }: PackageFilterProps) => {
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
