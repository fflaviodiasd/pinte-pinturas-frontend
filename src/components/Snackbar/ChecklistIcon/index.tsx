import { ContentCopy } from "@mui/icons-material";
import { useStyles } from "./styles";
import { Tooltip } from "@mui/material";

type ChecklistIconProps = {
  title: string;
};

export function ChecklistIcon({ title }: ChecklistIconProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.containerChecklistIcon}>
      <Tooltip title={title}>
        <div className={classes.titleChecklistIcon}>
          <ContentCopy className={classes.checklistCopyIcon} />
          Checklist
        </div>
      </Tooltip>
    </div>
  );
}
