import { forwardRef } from "react";
import { Dialog, IconButton, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ArrowForwardIosRounded as ArrowForwardIcon } from "@mui/icons-material/";

import { ConstructionFilter } from "../Filters/ConstructionFilter";
import { MeasurementFilter } from "../Filters/MeasurementFilter";
import { ChecklistFilter } from "../Filters/ChecklistFilter";
import { EmployeeFilter } from "../Filters/EmployeeFilter";
import { PackageFilter } from "../Filters/PackageFilter";
import { StatusFilter } from "../Filters/StatusFilter";
import { UserFilter } from "../Filters/UserFilter";

import { useStyles } from "./styles";

type ModalFiltersProps = {
  open: boolean;
  handleClose: () => void;
  filter: string;
};

export const ModalFilters = ({
  open,
  handleClose,
  filter,
}: ModalFiltersProps) => {
  const { classes } = useStyles();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className={classes.filterContainer}
    >
      <div className={classes.filterTitleContainer}>
        <Typography className={classes.filterTitle}>
          {displayFilterTitle(filter)}
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <ArrowForwardIcon
            className={classes.closeFilterButton}
            fontSize="small"
          />
        </IconButton>
      </div>

      {displayFilterContent(filter, handleClose)}
    </Dialog>
  );
};

const displayFilterTitle = (filter: string) => {
  switch (filter) {
    case "construction":
      return "Obras";
    case "checklist":
      return "Checklist";
    case "package":
      return "Pacotes";
    case "status":
      return "Status";
    case "user":
      return "Usuário";
    case "employee":
      return "Funcionário";
    default:
      return "Medição";
  }
};

const displayFilterContent = (filter: string, handleClose: () => void) => {
  switch (filter) {
    case "construction":
      return <ConstructionFilter handleClose={handleClose} />;
    case "checklist":
      return <ChecklistFilter handleClose={handleClose} />;
    case "package":
      return <PackageFilter handleClose={handleClose} />;
    case "status":
      return <StatusFilter handleClose={handleClose} />;
    case "user":
      return <UserFilter handleClose={handleClose} />;
    case "employee":
      return <EmployeeFilter handleClose={handleClose} />;
    default:
      return <MeasurementFilter handleClose={handleClose} />;
  }
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
