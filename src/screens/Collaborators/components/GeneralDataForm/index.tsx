/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, TextField, FormControlLabel, Switch } from "@mui/material";

import { InputMask } from "../../../../components/InputMask";
import { Collaborator } from "../../../../types";

import { useStyles } from "../styles";
import { SelectRoleComponent } from "../../../../components/Select/Role";
import { SelectProfileComponent } from "../../../../components/Select/Profile";

type GeneralDataFormProps = {
  values: Collaborator;
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

  return (
    <Grid container sm={12} md={12} lg={12} className={classes.formContainer}>
      <Grid item xs={12} lg={4} className={classes.fieldContainer}>
        <TextField
          name="name"
          label="Nome Completo"
          value={values.name}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} lg={4} className={classes.fieldContainer}>
        <SelectRoleComponent name="role" label="Cargo" endpoint="positions" />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <SelectProfileComponent
          name="profile"
          label="Perfil"
          endpoint="profile_types"
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="cell_phone"
          label="Celular"
          value={values.cell_phone}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="cpf"
          label="CPF"
          value={values.cpf}
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
          name="dateOfBirth"
          label="Data de Nascimento"
          value={values.phoneNumber}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} lg={4} className={classes.fieldContainer}>
        <TextField
          name="registration"
          label="Matrícula"
          value={values.registration}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
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
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="admissionDate"
          label="Data de Admissão"
          value={values.admissionDate}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          required
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={12} lg={2} className={classes.fieldContainer}>
        <TextField
          name="dismissalDate"
          label="Data de Demissão"
          value={values.dismissalDate}
          onChange={handleChange}
          variant="outlined"
          size="small"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true,
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
          required
          InputProps={{
            inputComponent: InputMask as any,
          }}
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
