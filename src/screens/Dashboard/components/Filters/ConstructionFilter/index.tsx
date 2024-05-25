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
import { KEY_DASHBOARD_CONSTRUCTION_OPTIONS } from "../../../../../utils/consts";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type ConstructionFilterProps = {
  handleClose: () => void;
};

type FilterOption = {
  id: number;
  name: string;
  checked: boolean;
};

interface ConstructionOption {
  id: number;
  name: string;
}

export const ConstructionFilter = ({
  handleClose,
}: ConstructionFilterProps) => {
  const { classes } = useStyles();
  const { listConstructions, getAllConstructions, setSelectedConstruction } =
    useContext(DashboardContext);

  useEffect(() => {
    getAllConstructions();
  }, []);

  const getStoredOptions = () => {
    const constructionOptionsStorage = localStorage.getItem(
      KEY_DASHBOARD_CONSTRUCTION_OPTIONS
    );
    if (constructionOptionsStorage) {
      const constructionOptionsParsed = JSON.parse(constructionOptionsStorage);
      return constructionOptionsParsed;
    }
    return [];
  };

  const defaultProps = {
    options: listConstructions,
    getOptionLabel: (option: ConstructionOption) => option.name,
  };

  const setStorageOptions = () => {
    const constructionOptions = JSON.stringify(options);
    localStorage.setItem(
      KEY_DASHBOARD_CONSTRUCTION_OPTIONS,
      constructionOptions
    );
  };

  const [options, setOptions] = useState<FilterOption[]>(getStoredOptions());
  const [value, setValue] = useState<ConstructionOption | null>(null);

  const clearValues = () => {
    setOptions([]);
    setValue(null);
    localStorage.removeItem(KEY_DASHBOARD_CONSTRUCTION_OPTIONS);
  };

  const selectedOptions = options.filter((option) => option.checked === true);

  const disableApplyButton = !Boolean(selectedOptions.length);

  const handleApply = () => {
    setSelectedConstruction({
      id: selectedOptions[0].id,
      name: selectedOptions[0].name,
    });
    setStorageOptions();
    handleClose();
  };

  const handleClear = () => {
    clearValues();
  };

  const onSelectedOption = (value: ConstructionOption | null) => {
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
        { id: value.id, name: value!.name, checked: false },
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
          onChange={(_, newValue: ConstructionOption | null) => {
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
              key={option.name}
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={(e) =>
                    setOptions((prevState) => {
                      return prevState.map((prevItem, prevIndex) => {
                        if (prevIndex === index) {
                          return { ...prevItem, checked: e.target.checked };
                        } else {
                          return { ...prevItem, checked: false };
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
