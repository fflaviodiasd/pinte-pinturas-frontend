import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type UnitFilterProps = {
  handleClose: () => void;
};

export const UnitFilter = ({ handleClose }: UnitFilterProps) => {
  const { classes } = useStyles();

  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const clearValues = () => {
    setOptions({
      option1: false,
      option2: false,
      option3: false,
      option4: false,
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
            label="cm - Centímetro"
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
            label="L - Litros"
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
            label="m² - Metro Quadrado"
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
            label="unidade"
          />
        </FormGroup>
      </div>

      <ActionButtons onApply={handleApply} onClear={handleClear} />
    </div>
  );
};
