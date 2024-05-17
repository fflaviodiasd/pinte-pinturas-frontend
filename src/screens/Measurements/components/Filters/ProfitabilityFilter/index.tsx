/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { MeasurementsContext } from "../../../../../contexts/MeasurementsContext";

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
  const { getDataTable, getProfitability } = useContext(MeasurementsContext);

  const [fieldType, setFieldType] = useState(1);

  const [conditions, setConditions] = useState({
    firstCondition: 1,
    secondCondition: 1,
  });

  const [values, setValues] = useState({
    firstValue: "",
    secondValue: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const [conjuctions, setConjuctions] = useState({
    conjuction1: true,
    conjuction2: false,
  });

  const getQueryParams = () => {
    const getCondition = (value: number) => {
      switch (value) {
        case 1:
          return "É igual";
        case 2:
          return "É diferente";
        case 3:
          return "É maior";
        case 4:
          return "É menor";
        case 5:
          return "É menor ou igual";
        case 6:
          return "É maior ou igual";
        case 7:
          return "Está em branco";
        default:
          return "Não está em branco";
      }
    };

    const field = fieldType === 1 ? "price_days" : "price_workmanship_days";
    const conjuction = conjuctions.conjuction1 ? "E" : "OU";
    const firstValue = values.firstValue;
    const firstCondition = getCondition(conditions.firstCondition);
    const secondValue = values.secondValue;
    const secondCondition = getCondition(conditions.secondCondition);

    return `field=${field}&condition=${firstCondition}&value=${firstValue}&conjuction=${conjuction}&conjuction2=${secondCondition}&value2=${secondValue}`;
  };

  const handleApply = () => {
    getProfitability(getQueryParams());
    getDataTable(getQueryParams());
    handleClose();
  };

  const handleClear = () => {
    setFieldType(1);
    setConditions({
      firstCondition: 1,
      secondCondition: 1,
    });
    setConjuctions({
      conjuction1: true,
      conjuction2: false,
    });
    setValues({
      firstValue: "",
      secondValue: "",
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <TextField
          select
          fullWidth
          size="small"
          label="Rentabilidade"
          defaultValue={fieldType}
          style={{ marginTop: 12 }}
          onChange={(e) => setFieldType(Number(e.target.value))}
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
          defaultValue={conditions.firstCondition}
          onChange={(e) =>
            setConditions((prevState) => ({
              ...prevState,
              firstCondition: Number(e.target.value),
            }))
          }
          style={{ marginTop: 12 }}
        >
          {showWhenList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="firstValue"
          label="Valor"
          value={values.firstValue}
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
                  checked={conjuctions.conjuction1}
                  onChange={(e) =>
                    setConjuctions({
                      conjuction1: e.target.checked,
                      conjuction2: false,
                    })
                  }
                />
              }
              label="E"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={conjuctions.conjuction2}
                  onChange={(e) =>
                    setConjuctions({
                      conjuction1: false,
                      conjuction2: e.target.checked,
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
          defaultValue={conditions.secondCondition}
          onChange={(e) =>
            setConditions((prevState) => ({
              ...prevState,
              secondCondition: Number(e.target.value),
            }))
          }
          style={{ marginTop: 12 }}
        >
          {showWhenList.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="secondValue"
          label="Valor"
          value={values.secondValue}
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
  { value: 1, label: "Diária" },
  { value: 2, label: "Mão de Obra" },
];
