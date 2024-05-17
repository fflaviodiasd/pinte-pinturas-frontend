import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type ServiceFilterProps = {
  handleClose: () => void;
};

export const ServiceFilter = ({ handleClose }: ServiceFilterProps) => {
  const { classes } = useStyles();

  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
  });

  const clearValues = () => {
    setOptions({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
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
            label="Pintura 01"
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
            label="Pintura 02"
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
            label="Pintura 03"
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
            label="Pintura 04"
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
            label="Pintura 05"
          />
        </FormGroup>
      </div>

      <ActionButtons onApply={handleApply} onClear={handleClear} />
    </div>
  );
};
