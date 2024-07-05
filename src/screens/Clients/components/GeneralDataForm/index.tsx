/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, TextField } from "@mui/material";

import { InputMask } from "../../../../components/InputMask";
import { Client } from "../../../../types";

import { useStyles } from "../styles";
import { useParams } from "react-router-dom";

type GeneralDataFormProps = {
  values: Client;
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
  const { id } = useParams();
  const isEditScreen = id;

  return (
    <Grid
      container
      sm={12}
      md={12}
      lg={12}
      className={classes.formContainer}
      //   spacing={2}
    >
      <Grid item xs={12} lg={4} className={classes.fieldContainer}>
        <TextField
          name="responsible"
          label="Nome Responsável"
          value={values.responsible}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} lg={4} className={classes.fieldContainer}>
        <TextField
          name="tradingName"
          label="Nome Fantasia"
          value={values.tradingName}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
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
          name="phoneNumber"
          label="Telefone"
          value={values.phoneNumber}
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
      <Grid item xs={12} lg={4} className={classes.fieldContainer}>
        <TextField
          name="corporateName"
          label="Razão Social"
          value={values.corporateName}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="municipalRegistration"
          label="Inscrição Municipal"
          value={values.municipalRegistration}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="stateRegistration"
          label="Inscrição Estadual"
          value={values.stateRegistration}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Grid>
      {isEditScreen ? (
        <Grid item xs={12} lg={2} className={classes.fieldContainer}>
          <TextField
            name="registrationDate"
            label="Data de Cadastro"
            value={values.registrationDate}
            onChange={handleChange}
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};
