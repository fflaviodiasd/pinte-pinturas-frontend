import { forwardRef } from "react";
import { Dialog, IconButton, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ArrowForwardIosRounded as ArrowForwardIcon } from "@mui/icons-material/";

import { useStyles } from "./styles";
import { ConstructionFilter } from "../Filters/ConstructionFilter";

type ModalFiltersProps = {
  open: boolean;
  handleClose: () => void;
};

export const ModalFilters = ({ open, handleClose }: ModalFiltersProps) => {
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
        <Typography className={classes.filterTitle}>Obras</Typography>
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

      <ConstructionFilter handleClose={handleClose} />
    </Dialog>
  );
};

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});
