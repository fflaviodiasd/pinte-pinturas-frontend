import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type StepFilterProps = {
  handleClose: () => void;
};

export const StepFilter = ({ handleClose }: StepFilterProps) => {
  const { classes } = useStyles();

  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    option6: false,
  });

  const clearValues = () => {
    setOptions({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
      option6: false,
    });
  };

  const handleApply = () => {
    console.log(options);
    handleClose();
  };

  const handleClear = () => {
    clearValues();
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={options.option1}
                onChange={(e) =>
                  setOptions((prevState) => ({
                    ...prevState,
                    option1: e.target.checked,
                  }))
                }
              />
            }
            label="Etapa A"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.option2}
                onChange={(e) =>
                  setOptions((prevState) => ({
                    ...prevState,
                    option2: e.target.checked,
                  }))
                }
              />
            }
            label="Etapa A+"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.option3}
                onChange={(e) =>
                  setOptions((prevState) => ({
                    ...prevState,
                    option3: e.target.checked,
                  }))
                }
              />
            }
            label="Etapa B"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.option4}
                onChange={(e) =>
                  setOptions((prevState) => ({
                    ...prevState,
                    option4: e.target.checked,
                  }))
                }
              />
            }
            label="Etapa C"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.option5}
                onChange={(e) =>
                  setOptions((prevState) => ({
                    ...prevState,
                    option5: e.target.checked,
                  }))
                }
              />
            }
            label="Etapa D"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.option6}
                onChange={(e) =>
                  setOptions((prevState) => ({
                    ...prevState,
                    option6: e.target.checked,
                  }))
                }
              />
            }
            label="Etapa E"
          />
        </FormGroup>
      </div>

      <ActionButtons onApply={handleApply} onClear={handleClear} />
    </div>
  );
};
