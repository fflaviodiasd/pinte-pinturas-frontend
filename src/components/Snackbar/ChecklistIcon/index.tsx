import { ContentCopy } from "@mui/icons-material";
import { useStyles } from "./styles";
import { Tooltip } from "@mui/material";

type ChecklistIconProps = {
  title: string;
  handleClick: any;
};

export function ChecklistIcon({ title, handleClick }: ChecklistIconProps) {
  const { classes } = useStyles();

  return (
    <button className={classes.buttonChecklistIcon} onClick={handleClick}>
      <Tooltip title={title}>
        <div className={classes.containerChecklistIcon}>
          <ContentCopy className={classes.checklistIcon} />
          Checklist
        </div>
      </Tooltip>
    </button>
  );
}
