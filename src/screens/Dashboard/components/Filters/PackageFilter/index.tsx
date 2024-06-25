/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { KEY_DASHBOARD_PACKAGE_OPTIONS } from "../../../../../utils/consts";
import { FilterOption } from "../../../../../types";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type PackageFilterProps = {
  handleClose: () => void;
};

interface PackageOption {
  id: number;
  name: string;
}

export const PackageFilter = ({ handleClose }: PackageFilterProps) => {
  const { classes } = useStyles();
  const { listPackages, getAllPackages, setAllQueriesFilters } =
    useContext(DashboardContext);

  useEffect(() => {
    getAllPackages();
  }, []);

  const getStoredOptions = () => {
    const packageOptionsStorage = localStorage.getItem(
      KEY_DASHBOARD_PACKAGE_OPTIONS
    );
    if (packageOptionsStorage) {
      const packageOptionsParsed = JSON.parse(packageOptionsStorage);
      return packageOptionsParsed;
    }
    return [];
  };

  const defaultProps = {
    options: listPackages,
    getOptionLabel: (option: PackageOption) => option.name,
  };

  const setStorageOptions = () => {
    const packageOptions = JSON.stringify(options);
    localStorage.setItem(KEY_DASHBOARD_PACKAGE_OPTIONS, packageOptions);
  };

  const [options, setOptions] = useState<FilterOption[]>(getStoredOptions());
  const [value, setValue] = useState<PackageOption | null>(null);

  const clearValues = () => {
    setOptions([]);
    setValue(null);
    localStorage.removeItem(KEY_DASHBOARD_PACKAGE_OPTIONS);
  };

  const selectedOptions = options.filter((option) => option.checked === true);

  const queryParams = selectedOptions
    .map((option) => `packages=${option.name}`)
    .join("&");

  const disableApplyButton = !Boolean(selectedOptions.length);

  const handleApply = () => {
    setAllQueriesFilters((prevState) => ({
      ...prevState,
      package: queryParams,
    }));

    setStorageOptions();
    handleClose();
  };

  const handleClear = () => {
    clearValues();
  };

  const onSelectedOption = (value: PackageOption | null) => {
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
          onChange={(_, newValue: PackageOption | null) => {
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
