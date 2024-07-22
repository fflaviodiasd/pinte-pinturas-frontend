/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, TextField } from "@mui/material";

import { NumberInput } from "../../../../../components/NumberInput";
import { InputMask } from "../../../../../components/InputMask";
import { ConstructionRegister } from "../../../../../types";

import { useStyles } from "../styles";
import { UserContext } from "../../../../../contexts/UserContext";
import { useContext } from "react";

type AddressFormProps = {
  values: ConstructionRegister;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
};

export const AddressForm = ({ values, handleChange }: AddressFormProps) => {
  const { classes } = useStyles();

  const { user } = useContext(UserContext);

  const isTypeDisabled = user.type === 7 || user.type === 8 || user.type === 9;

  return (
    <Grid container className={classes.formContainer}>
      <Grid item xs={12} lg={1} className={classes.fieldContainer}>
        <TextField
          name="cep"
          label="CEP"
          value={values.cep}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            inputComponent: InputMask as any,
          }}
          disabled={isTypeDisabled}
        />
      </Grid>
      <Grid item xs={12} lg={1} className={classes.fieldContainer}>
        <TextField
          name="state"
          label="Estado"
          value={values.state}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          disabled={isTypeDisabled}
        />
      </Grid>
      <Grid item xs={12} lg={5} className={classes.fieldContainer}>
        <TextField
          name="county"
          label="Cidade"
          value={values.county}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          disabled={isTypeDisabled}
        />
      </Grid>
      <Grid item xs={12} lg={5} className={classes.fieldContainer}>
        <TextField
          name="neighborhood"
          label="Bairro"
          value={values.neighborhood}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          disabled={isTypeDisabled}
        />
      </Grid>
      <Grid item xs={12} lg={4} className={classes.fieldContainer}>
        <TextField
          name="public_place"
          label="Logradouro"
          value={values.public_place}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          disabled={isTypeDisabled}
        />
      </Grid>
      <Grid item xs={12} lg={6} className={classes.fieldContainer}>
        <TextField
          name="complement"
          label="Complemento"
          value={values.complement}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          disabled={isTypeDisabled}
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="number"
          label="Número"
          value={values.number}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            inputComponent: NumberInput as any,
          }}
          disabled={isTypeDisabled}
        />
      </Grid>
    </Grid>
  );
};
