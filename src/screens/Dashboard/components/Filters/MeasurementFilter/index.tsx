/* eslint-disable no-extra-boolean-cast */
import { useContext, useEffect, useState } from "react";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

import { DashboardContext } from "../../../../../contexts/DashboardContext";

import { KEY_DASHBOARD_MEASUREMENT_OPTIONS } from "../../../../../utils/consts";
import { FilterOption } from "../../../../../types";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type MeasurementFilterProps = {
  handleClose: () => void;
};

interface MeasurementOption {
  id: number;
  name: string;
}

export const MeasurementFilter = ({ handleClose }: MeasurementFilterProps) => {
  const { classes } = useStyles();
  const {
    listMeasurements,
    getAllMeasurements,
    getDashboardChecklist,
    getDashboardExecution,
    getDashboardConstructionUpdate,
    getInteractions,
  } = useContext(DashboardContext);

  useEffect(() => {
    getAllMeasurements();
  }, []);

  const getStoredOptions = () => {
    const measurementOptionsStorage = localStorage.getItem(
      KEY_DASHBOARD_MEASUREMENT_OPTIONS
    );
    if (measurementOptionsStorage) {
      const measurementOptionsParsed = JSON.parse(measurementOptionsStorage);
      return measurementOptionsParsed;
    }
    return [];
  };

  const defaultProps = {
    options: listMeasurements,
    getOptionLabel: (option: MeasurementOption) => option.name,
  };

  const setStorageOptions = () => {
    const measurementOptions = JSON.stringify(options);
    localStorage.setItem(KEY_DASHBOARD_MEASUREMENT_OPTIONS, measurementOptions);
  };

  const [options, setOptions] = useState<FilterOption[]>(getStoredOptions());
  const [value, setValue] = useState<MeasurementOption | null>(null);

  const clearValues = () => {
    setOptions([]);
    setValue(null);
    localStorage.removeItem(KEY_DASHBOARD_MEASUREMENT_OPTIONS);
  };

  const selectedOptions = options.filter((option) => option.checked === true);

  const queryParams = selectedOptions
    .map((option) => `measurements=${option.name}`)
    .join("&");

  const disableApplyButton = !Boolean(selectedOptions.length);

  const handleApply = () => {
    getDashboardChecklist(queryParams);
    getDashboardExecution(queryParams);
    getDashboardConstructionUpdate(queryParams);
    getInteractions(queryParams);
    setStorageOptions();
    handleClose();
  };

  const handleClear = () => {
    clearValues();
  };

  const onSelectedOption = (value: MeasurementOption | null) => {
    if (value === null) {
      setValue(value);
      return;
    }
    setOptions((prevState) => {
      const alreadyExist =
        prevState.filter((option) => option.name === value.name).length > 0;
      if (alreadyExist) {
        return prevState;
      }
      return [
        ...prevState,
        {
          name: value!.name,
          checked: true,
        },
      ];
    });
    setValue(null);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Autocomplete
          {...defaultProps}
          value={value}
          onChange={(_, newValue: MeasurementOption | null) => {
            onSelectedOption(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pesquisar"
              variant="outlined"
              size="small"
            />
          )}
          noOptionsText="Não há opções"
          style={{ margin: "4px 0" }}
        />

        <FormGroup>
          {options.map((option, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={(e) =>
                    setOptions((prevState) => {
                      return prevState.map((prevItem, prevIndex) => {
                        if (prevIndex === index) {
                          return { ...prevItem, checked: e.target.checked };
                        } else {
                          return prevItem;
                        }
                      });
                    })
                  }
                />
              }
              label={option.name}
            />
          ))}
        </FormGroup>
      </div>

      <ActionButtons
        onApply={handleApply}
        onClear={handleClear}
        disableApply={disableApplyButton}
      />
    </div>
  );
};
