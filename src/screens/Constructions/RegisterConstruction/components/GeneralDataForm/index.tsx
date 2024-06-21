/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  // MenuItem,
} from "@mui/material";

import { useConstructions } from "../../../../../hooks/useConstructions";
import {
  // ConstructionData,
  ConstructionRegister,
} from "../../../../../types";

import { SelectClientComponent } from "../../../../../components/Select/Client";
import { InputMask } from "../../../../../components/InputMask";

import { useStyles } from "../styles";

type GeneralDataFormProps = {
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

export const GeneralDataForm = ({
  values,
  handleChange,
}: GeneralDataFormProps) => {
  const { classes } = useStyles();

  const { listCompanyClients, getAllCompanyClients } = useConstructions();

  useEffect(() => {
    getAllCompanyClients();
  }, []);

  return (
    <Grid container className={classes.formContainer}>
      <Grid item xs={12} lg={5} className={classes.fieldContainer}>
        <TextField
          name="fantasy_name"
          label="Nome Fantasia"
          value={values.fantasy_name}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} lg={5} className={classes.fieldContainer}>
        <SelectClientComponent
          name="customer"
          label="Cliente"
          options={listCompanyClients}
        />
      </Grid>

      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="phone"
          label="Telefone"
          value={values.phone}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            inputComponent: InputMask as any,
          }}
        />
      </Grid>
      <Grid item xs={12} lg={4} className={classes.fieldContainer}>
        <TextField
          name="corporate_name"
          label="Razão Social"
          value={values.corporate_name}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} lg={3} className={classes.fieldContainer}>
        <TextField
          name="cnpj"
          label="CNPJ"
          value={values.cnpj}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
          InputProps={{
            inputComponent: InputMask as any,
          }}
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="cno"
          label="CNO"
          value={values.cno}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} lg={3} className={classes.fieldContainer}>
        <TextField
          name="email"
          label="E-mail"
          value={values.email}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
          type="email"
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="municipal_registration"
          label="Inscrição Municipal"
          value={values.municipal_registration}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="state_registration"
          label="Inscrição Estadual"
          value={values.state_registration}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Grid>

      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <FormControlLabel
          control={<Switch />}
          label="Ativo"
          name="active"
          checked={values.active}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};
