/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import {
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

import { KEY_DISCIPLINE_OPTIONS } from "../../../../../utils/consts";
import { FilterOption } from "../../../../../types";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type DisciplineFilterProps = {
  handleClose: () => void;
};

interface FilmOptionType {
  title: string;
  year: number;
}

export const DisciplineFilter = ({ handleClose }: DisciplineFilterProps) => {
  const { classes } = useStyles();

  const getStoredOptions = () => {
    const disciplineOptionsStorage = localStorage.getItem(
      KEY_DISCIPLINE_OPTIONS
    );
    if (disciplineOptionsStorage) {
      const disciplineOptionsParsed = JSON.parse(disciplineOptionsStorage);
      return disciplineOptionsParsed;
    }
    return [
      { name: "Disciplina 01", checked: false },
      { name: "Disciplina 02", checked: false },
      { name: "Disciplina 03", checked: false },
      { name: "Disciplina 04", checked: false },
      { name: "Disciplina 05", checked: false },
    ];
  };

  const setStorageOptions = () => {
    const disciplineOptions = JSON.stringify(options);
    localStorage.setItem(KEY_DISCIPLINE_OPTIONS, disciplineOptions);
  };

  const [options, setOptions] = useState<FilterOption[]>(getStoredOptions());
  const [value, setValue] = useState<FilmOptionType | null>(null);

  const clearValues = () => {
    setOptions([]);
    setValue(null);
    localStorage.removeItem(KEY_DISCIPLINE_OPTIONS);
  };

  const selectedOptions = options.filter((option) => option.checked === true);

  const queryParams = selectedOptions
    .map((option) => `package_name=${option.name}`)
    .join("&");

  const disableApplyButton = !Boolean(selectedOptions.length);

  const handleApply = () => {
    console.log(queryParams);
    setStorageOptions();
    handleClose();
  };

  const handleClear = () => {
    clearValues();
  };

  const onSelectedOption = (value: FilmOptionType | null) => {
    if (value === null) {
      setValue(value);
      return;
    }
    setOptions((prevState) => {
      const alreadyExist =
        prevState.filter((option) => option.name === value.title).length > 0;
      if (alreadyExist) {
        return prevState;
      }
      return [
        ...prevState,
        {
          name: value!.title,
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
          onChange={(_, newValue: FilmOptionType | null) => {
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

const movies = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

const defaultProps = {
  options: movies,
  getOptionLabel: (option: FilmOptionType) => option.title,
};
