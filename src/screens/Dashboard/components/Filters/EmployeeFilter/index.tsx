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

import { KEY_DASHBOARD_EMPLOYEE_OPTIONS } from "../../../../../utils/consts";
import { FilterOption } from "../../../../../types";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type EmployeeFilterProps = {
  handleClose: () => void;
};

interface EmployeeOption {
  id: number;
  name: string;
}

export const EmployeeFilter = ({ handleClose }: EmployeeFilterProps) => {
  const { classes } = useStyles();
  const {
    listEmployees,
    getAllEmployees,
    getDashboardConstructionUpdate,
    setAllQueriesFilters,
  } = useContext(DashboardContext);

  useEffect(() => {
    getAllEmployees();
  }, []);
  useEffect(() => {
    console.log(listEmployees);
  }, [listEmployees]);

  const getStoredOptions = () => {
    const employeeOptionsStorage = localStorage.getItem(
      KEY_DASHBOARD_EMPLOYEE_OPTIONS
    );
    if (employeeOptionsStorage) {
      const employeeOptionsParsed = JSON.parse(employeeOptionsStorage);
      return employeeOptionsParsed;
    }
    return [];
  };

  const defaultProps = {
    options: listEmployees,
    getOptionLabel: (option: EmployeeOption) => option.name,
  };

  const setStorageOptions = () => {
    const employeeOptions = JSON.stringify(options);
    localStorage.setItem(KEY_DASHBOARD_EMPLOYEE_OPTIONS, employeeOptions);
  };

  const [options, setOptions] = useState<FilterOption[]>(getStoredOptions());
  const [value, setValue] = useState<EmployeeOption | null>(null);

  const clearValues = () => {
    setOptions([]);
    setValue(null);
    localStorage.removeItem(KEY_DASHBOARD_EMPLOYEE_OPTIONS);
  };

  const selectedOptions = options.filter((option) => option.checked === true);

  const queryParams = selectedOptions
    .map((option) => `employees=${option.name}`)
    .join("&");

  const disableApplyButton = !Boolean(selectedOptions.length);

  const handleApply = () => {
    setAllQueriesFilters((prevState) => ({
      ...prevState,
      employee: queryParams,
    }));

    getDashboardConstructionUpdate(queryParams);
    setStorageOptions();
    handleClose();
  };

  const handleClear = () => {
    clearValues();
  };

  const onSelectedOption = (value: EmployeeOption | null) => {
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
        <div className={classes.content}>
          <Autocomplete
            {...defaultProps}
            value={value}
            onChange={(_, newValue: EmployeeOption | null) => {
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
    </div>
  );
};
