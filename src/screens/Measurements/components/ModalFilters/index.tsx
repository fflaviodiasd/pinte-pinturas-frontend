import { forwardRef } from "react";
import { Dialog, IconButton, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ArrowForwardIosRounded as ArroForwardIcon } from "@mui/icons-material/";

import { ProfitabilityFilter } from "../Filters/ProfitabilityFilter";
import { DisciplineFilter } from "../Filters/DisciplineFilter";
import { PackageFilter } from "../Filters/PackageFilter";
import { PeriodFilter } from "../Filters/PeriodFilter";
import { DailyFilter } from "../Filters/DailyFilter";

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
          <ArroForwardIcon
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
    case "daily":
      return "Diárias";
    case "period":
      return "Período";
    case "package":
      return "Pacotes";
    case "profitability":
      return "Rentabilidade";
    default:
      return "Disciplina";
  }
};

const displayFilterContent = (filter: string, handleClose: () => void) => {
  switch (filter) {
    case "daily":
      return <DailyFilter handleClose={handleClose} />;
    case "period":
      return <PeriodFilter handleClose={handleClose} />;
    case "package":
      return <PackageFilter handleClose={handleClose} />;
    case "profitability":
      return <ProfitabilityFilter handleClose={handleClose} />;
    default:
      return <DisciplineFilter handleClose={handleClose} />;
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
