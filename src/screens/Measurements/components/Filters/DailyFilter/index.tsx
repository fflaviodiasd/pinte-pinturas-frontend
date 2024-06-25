/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-boolean-cast */
import { useState, useContext } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

import { MeasurementsContext } from "../../../../../contexts/MeasurementsContext";
import { KEY_DAILY_OPTIONS } from "../../../../../utils/consts";
import { FilterOption } from "../../../../../types";

import { ActionButtons } from "../components/ActionButtons";
import { NumberInput } from "../components/NumericInput";

import { useStyles } from "../filterStyles";

type DailyFilterProps = {
  handleClose: () => void;
};

export const DailyFilter = ({ handleClose }: DailyFilterProps) => {
  const { classes } = useStyles();
  const { setAllQueriesFilters } = useContext(MeasurementsContext);

  const [days, setDays] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDays(event.target.value);
  };

  const getStoredOptions = () => {
    const dailyOptionsStorage = localStorage.getItem(KEY_DAILY_OPTIONS);
    if (dailyOptionsStorage) {
      const dailyOptionsParsed = JSON.parse(dailyOptionsStorage);
      return dailyOptionsParsed;
    }
    return [];
  };

  const setStorageOptions = () => {
    const dailyOptions = JSON.stringify(options);
    localStorage.setItem(KEY_DAILY_OPTIONS, dailyOptions);
  };

  const [options, setOptions] = useState<FilterOption[]>(getStoredOptions());

  const selectedOptions = options.filter((option) => option.checked === true);

  const queryParams = selectedOptions
    .map((option) => `days=${option.name}`)
    .join("&");

  const disableApplyButton = !Boolean(selectedOptions.length);

  const handleApply = () => {
    setAllQueriesFilters((prevState) => ({
      ...prevState,
      days: queryParams,
    }));

    setStorageOptions();
    handleClose();
  };

  const clearValues = () => {
    setOptions([]);
    localStorage.removeItem(KEY_DAILY_OPTIONS);
  };

  const handleClear = () => {
    clearValues();
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <TextField
          label="Dias"
          value={days}
          onChange={handleChange}
          InputProps={{
            inputComponent: NumberInput as any,
          }}
          size="small"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const dayOption = (event.target as HTMLInputElement).value;
              setOptions((prevState) => {
                const alreadyExist =
                  prevState.filter(
                    (option) => option.name === String(dayOption)
                  ).length > 0;
                if (alreadyExist) {
                  return prevState;
                }
                return [
                  ...prevState,
                  {
                    name: String(dayOption),
                    checked: true,
                  },
                ];
              });
            }
          }}
        />

        <FormGroup>
          {options.map((option, index) => {
            const label = `${option.name} dia${
              Number(option.name) > 1 ? "s" : ""
            }`;
            return (
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
                label={label}
              />
            );
          })}
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
