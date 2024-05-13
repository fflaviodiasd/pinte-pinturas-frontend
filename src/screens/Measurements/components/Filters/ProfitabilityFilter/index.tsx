/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { ActionButtons } from "../components/ActionButtons";
import { NumericInput } from "../components/NumericInput";

import { useStyles } from "../filterStyles";

type ProfitabilityFilterProps = {
  handleClose: () => void;
};

export const ProfitabilityFilter = ({
  handleClose,
}: ProfitabilityFilterProps) => {
  const { classes } = useStyles();

  const [options, setOptions] = useState({
    option1: true,
    option2: false,
  });

  const clearValues = () => {
    setOptions({
      option1: true,
      option2: false,
    });
  };

  const handleApply = () => {
    console.log(options);
    handleClose();
  };

  const handleClear = () => {
    clearValues();
  };

  const [numberformat, setNumberformat] = useState("1320");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberformat(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <TextField
          select
          fullWidth
          size="small"
          label="Rentabilidade"
          defaultValue={1}
          style={{ marginTop: 12 }}
        >
          {profitableList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          size="small"
          label="Mostrar Quando"
          defaultValue={1}
          style={{ marginTop: 12 }}
        >
          {showWhenList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Valor"
          value={numberformat}
          onChange={handleChange}
          InputProps={{
            inputComponent: NumericInput as any,
          }}
          size="small"
          style={{ marginTop: 12 }}
        />

        <FormControl>
          <RadioGroup row>
            <FormControlLabel
              control={
                <Radio
                  checked={options.option1}
                  onChange={(e) =>
                    setOptions({
                      option1: e.target.checked,
                      option2: false,
                    })
                  }
                />
              }
              label="E"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={options.option2}
                  onChange={(e) =>
                    setOptions({
                      option1: false,
                      option2: e.target.checked,
                    })
                  }
                />
              }
              label="Ou"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          select
          fullWidth
          size="small"
          label="Mostrar Quando"
          defaultValue={1}
          style={{ marginTop: 12 }}
        >
          {showWhenList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Valor"
          value={numberformat}
          onChange={handleChange}
          InputProps={{
            inputComponent: NumericInput as any,
          }}
          size="small"
          style={{ marginTop: 12 }}
        />
      </div>

      <ActionButtons onApply={handleApply} onClear={handleClear} />
    </div>
  );
};

const showWhenList = [
  {
    value: 1,
    label: "É igual a",
  },
  {
    value: 2,
    label: "É diferente a",
  },
  {
    value: 3,
    label: "É maior que",
  },
  {
    value: 4,
    label: "É menor que",
  },
  {
    value: 5,
    label: "É menor ou igual a",
  },
  {
    value: 6,
    label: "É maior ou igual a",
  },
  {
    value: 7,
    label: "Está em branco",
  },
  {
    value: 8,
    label: "Não está em branco",
  },
];

const profitableList = [
  { value: 1, label: "Mão de Obra 01" },
  { value: 2, label: "Mão de Obra 02" },
  { value: 3, label: "Mão de Obra 03" },
  { value: 4, label: "Mão de Obra 04" },
  { value: 5, label: "Mão de Obra 05" },
];
