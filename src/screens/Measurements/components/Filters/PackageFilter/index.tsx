/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

import { ActionButtons } from "../components/ActionButtons";
import { useStyles } from "../filterStyles";

type PackageFilterProps = {
  handleClose: () => void;
};

interface FilmOptionType {
  title: string;
  year: number;
}

export const PackageFilter = ({ handleClose }: PackageFilterProps) => {
  const { classes } = useStyles();

  const [newOptions, setNewOptions] = useState([
    { name: "Pacote 01", checked: false },
    { name: "Pacote 02", checked: false },
    { name: "Pacote 03", checked: false },
    { name: "Pacote 04", checked: false },
    { name: "Pacote 05", checked: false },
  ]);
  const [value, setValue] = useState<FilmOptionType | null>(null);
  const movies = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  const clearValues = () => {
    setNewOptions([]);
    setValue(null);
  };

  const selectedOptions = newOptions.filter(
    (option) => option.checked === true
  );

  const queryParams = selectedOptions
    .map((option) => `package_name=${option.name}`)
    .join("&");

  const disableApplyButton = !Boolean(selectedOptions.length);

  const handleApply = () => {
    console.log(queryParams);
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
    setNewOptions((prevState) => {
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

  const defaultProps = {
    options: movies,
    getOptionLabel: (option: FilmOptionType) => option.title,
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
          {newOptions.map((option, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={(e) =>
                    setNewOptions((prevState) => {
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
