import { useContext, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Toolbar,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { Formik, Form as FormikForm } from "formik";

import { successMessage } from "../../components/Messages";
import { UserContext } from "../../contexts/UserContext";
import { InputMask } from "../../components/InputMask";

import { useStyles } from "./styles";
import { KEY_SIGNED } from "../../utils/consts";

interface LoginData {
  cpf: string;
  cnpj: string;
  password: string;
}

export const Login = () => {
  const { classes } = useStyles();
  const { setIsSigned } = useContext(UserContext);

  const loginData: LoginData = {
    cpf: "",
    cnpj: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const fakeLogin = (values: LoginData) => {
    localStorage.clear();
    localStorage.setItem(KEY_SIGNED, JSON.stringify(true));
    setIsSigned(true);
    successMessage("Login realizado com sucesso!");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={loginData}
      onSubmit={(values) => {
        fakeLogin(values);
      }}
    >
      {({ handleChange, values, handleSubmit }) => (
        <FormikForm>
          <Toolbar />
          <Grid container>
            <Grid item lg={12} className={classes.formContainer}>
              <Paper className={classes.paper}>
                <div className={classes.loginContentContainer}>
                  <div style={{ marginTop: 12 }}>
                    <InputLabel className={classes.inputLabel}>CPF</InputLabel>
                    <TextField
                      name="cpf"
                      value={values.cpf}
                      onChange={handleChange}
                      placeholder="Insira aqui seu CPF"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      InputProps={{
                        inputComponent: InputMask as any,
                      }}
                    />
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <InputLabel className={classes.inputLabel}>
                      Senha
                    </InputLabel>
                    <TextField
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword((prevState) => !prevState)
                              }
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

                  <Button
                    className={classes.buttonLogin}
                    onClick={() => handleSubmit()}
                    fullWidth
                  >
                    Entrar
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};
