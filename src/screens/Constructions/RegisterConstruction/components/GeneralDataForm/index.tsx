/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  MenuItem,
} from "@mui/material";

import { useCompanies } from "../../../../../hooks/useCompanies";
import { Company } from "../../../../../types";

import { InputMask } from "../../../../../components/InputMask";

import { useStyles } from "../styles";

type GeneralDataFormProps = {
  values: Company;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  setSelectedClientId: React.Dispatch<React.SetStateAction<string>>;
};

export const GeneralDataForm = ({
  values,
  handleChange,
  setSelectedClientId,
}: GeneralDataFormProps) => {
  const { classes } = useStyles();

  const { listCompanyCustomers, getAllCompanyCustomers } = useCompanies();

  useEffect(() => {
    getAllCompanyCustomers();
  }, []);

  return (
    <Grid container sm={12} md={12} lg={12} className={classes.formContainer}>
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
        <TextField
          select
          name="customer"
          label="Cliente"
          variant="outlined"
          placeholder="Cliente"
          size="small"
          fullWidth
          onChange={(event: any) => {
            const { value } = event.target;
            setSelectedClientId(value);
          }}
        >
          {listCompanyCustomers.map((client) => (
            <MenuItem key={client.id} value={client.id}>
              {client.name}
            </MenuItem>
          ))}
        </TextField>
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
          InputProps={{
            inputComponent: InputMask as any,
          }}
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
