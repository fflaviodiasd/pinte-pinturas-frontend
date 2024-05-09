import { forwardRef } from "react";
import { Dialog, IconButton, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ArrowForwardIosRounded as ArroForwardIcon } from "@mui/icons-material/";

import { ProfitabilityFilter } from "../Filters/ProfitabilityFilter";
import { ServiceFilter } from "../Filters/ServiceFilter";
import { PeriodFilter } from "../Filters/PeriodFilter";
import { ScopeFilter } from "../Filters/ScopeFilter";
import { StepFilter } from "../Filters/StepFilter";
import { UnitFilter } from "../Filters/UnitFilter";

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

      {displayFilterContent(filter)}
    </Dialog>
  );
};

const displayFilterTitle = (filter: string) => {
  switch (filter) {
    case "scope":
      return "Escopo";
    case "step":
      return "Etapa";
    case "service":
      return "Serviço";
    case "unit":
      return "Unidade";
    case "period":
      return "Período";
    default:
      return "Rentabilidade";
  }
};

const displayFilterContent = (filter: string) => {
  switch (filter) {
    case "scope":
      return <ScopeFilter />;
    case "step":
      return <StepFilter />;
    case "service":
      return <ServiceFilter />;
    case "unit":
      return <UnitFilter />;
    case "period":
      return <PeriodFilter />;
    default:
      return <ProfitabilityFilter />;
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
