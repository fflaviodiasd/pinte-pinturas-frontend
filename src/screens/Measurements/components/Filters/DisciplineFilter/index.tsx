/* eslint-disable no-extra-boolean-cast */
import { useContext, useEffect, useState } from "react";
import {
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import { MeasurementsContext } from "../../../../../contexts/MeasurementsContext";
import { KEY_DISCIPLINE_OPTIONS } from "../../../../../utils/consts";
import { FilterOption } from "../../../../../types";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type DisciplineFilterProps = {
  handleClose: () => void;
};

interface DisciplineOption {
  id: number;
  name: string;
}

export const DisciplineFilter = ({ handleClose }: DisciplineFilterProps) => {
  const { classes } = useStyles();
  const { listDisciplines, getAllDisciplines, getDataTable, getProfitability } =
    useContext(MeasurementsContext);

  useEffect(() => {
    getAllDisciplines();
  }, []);

  const getStoredOptions = () => {
    const disciplineOptionsStorage = localStorage.getItem(
      KEY_DISCIPLINE_OPTIONS
    );
    if (disciplineOptionsStorage) {
      const disciplineOptionsParsed = JSON.parse(disciplineOptionsStorage);
      return disciplineOptionsParsed;
    }
    return [];
  };

  const defaultProps = {
    options: listDisciplines,
    getOptionLabel: (option: DisciplineOption) => option.name,
  };

  const setStorageOptions = () => {
    const disciplineOptions = JSON.stringify(options);
    localStorage.setItem(KEY_DISCIPLINE_OPTIONS, disciplineOptions);
  };

  const [options, setOptions] = useState<FilterOption[]>(getStoredOptions());
  const [value, setValue] = useState<DisciplineOption | null>(null);

  const clearValues = () => {
    setOptions([]);
    setValue(null);
    localStorage.removeItem(KEY_DISCIPLINE_OPTIONS);
  };

  const selectedOptions = options.filter((option) => option.checked === true);

  const queryParams = selectedOptions
    .map((option) => `discipline_name=${option.name}`)
    .join("&");

  const disableApplyButton = !Boolean(selectedOptions.length);

  const handleApply = () => {
    // console.log(queryParams);
    getProfitability(queryParams);
    getDataTable(queryParams);
    setStorageOptions();
    handleClose();
  };

  const handleClear = () => {
    clearValues();
  };

  const onSelectedOption = (value: DisciplineOption | null) => {
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
          onChange={(_, newValue: DisciplineOption | null) => {
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
