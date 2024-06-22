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
import { FilterOption } from "../../../../../types";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";
import { KEY_DASHBOARD_CHECKLIST_OPTIONS } from "../../../../../utils/consts";

type ChecklistFilterProps = {
  handleClose: () => void;
};

interface ChecklistOption {
  id: number;
  name: string;
}

export const ChecklistFilter = ({ handleClose }: ChecklistFilterProps) => {
  const { classes } = useStyles();
  const {
    listChecklists,
    getAllChecklists,
    getDashboardChecklist,
    getDashboardExecution,
    getDashboardConstructionUpdate,
    getInteractions,
  } = useContext(DashboardContext);

  useEffect(() => {
    getAllChecklists();
  }, []);

  const getStoredOptions = () => {
    const checklistOptionsStorage = localStorage.getItem(
      KEY_DASHBOARD_CHECKLIST_OPTIONS
    );
    if (checklistOptionsStorage) {
      const checklistOptionsParsed = JSON.parse(checklistOptionsStorage);
      return checklistOptionsParsed;
    }
    return [];
  };

  const defaultProps = {
    options: listChecklists,
    getOptionLabel: (option: ChecklistOption) => option.name,
  };

  const setStorageOptions = () => {
    const checklistOptions = JSON.stringify(options);
    localStorage.setItem(KEY_DASHBOARD_CHECKLIST_OPTIONS, checklistOptions);
  };

  const [options, setOptions] = useState<FilterOption[]>(getStoredOptions());
  const [value, setValue] = useState<ChecklistOption | null>(null);

  const clearValues = () => {
    setOptions([]);
    setValue(null);
    localStorage.removeItem(KEY_DASHBOARD_CHECKLIST_OPTIONS);
  };

  const selectedOptions = options.filter((option) => option.checked === true);

  const queryParams = selectedOptions
    .map((option) => `checklists=${option.name}`)
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

  const onSelectedOption = (value: ChecklistOption | null) => {
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
          onChange={(_, newValue: ChecklistOption | null) => {
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
