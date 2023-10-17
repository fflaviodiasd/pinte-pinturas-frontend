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

import { errorMessage } from "../../components/Messages";
import { UserContext } from "../../contexts/UserContext";

import { useStyles } from "./styles";
import {
  KEY_REFRESH_TOKEN,
  KEY_SIGNED,
  KEY_TOKEN,
  KEY_USER,
} from "../../utils/consts";
import { api } from "../../services/api";

interface LoginData {
  username: string;
  password: string;
}

export const Login = () => {
  const { classes } = useStyles();
  const { setIsSigned, setUser } = useContext(UserContext);

  const loginData: LoginData = {
    username: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  const fakeLogin = async (values: LoginData) => {
    api.defaults.headers.common["Authorization"] = "";
    localStorage.clear();

    try {
      const { data } = await api.post("/accounts/token/", values);
      console.log(data);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;

      if (data.user) {
        localStorage.setItem(
          KEY_USER,
          JSON.stringify({
            id: data.user.id,
            isFirst: data.user.is_first,
            type: data.user.type,
            name: data.user.name || "",
            company: data.user.company || 0,
          })
        );
        setUser({
          id: data.user.id,
          isFirst: data.user.is_first,
          type: data.user.type,
          name: data.user.name || "",
          company: data.user.company || 0,
        });
      }
      localStorage.setItem(KEY_TOKEN, data.access);
      localStorage.setItem(KEY_REFRESH_TOKEN, data.refresh);
      localStorage.setItem(KEY_SIGNED, JSON.stringify(true));
      setIsSigned(true);
    } catch (error) {
      console.log(error);
      errorMessage("Não foi possível realizar autenticação.");
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={loginData}
      onSubmit={(values) => {
        fakeLogin(values);
      }}
    >
      {({ handleChange, values }) => (
        <FormikForm>
          <Toolbar />
          <Grid container>
            <Grid item lg={12} className={classes.formContainer}>
              <Paper className={classes.paper}>
                <div className={classes.loginContentContainer}>
                  <div style={{ marginTop: 12 }}>
                    <InputLabel className={classes.inputLabel}>CPF</InputLabel>
                    <TextField
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      placeholder="Insira aqui seu usuário"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
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
                    fullWidth
                    type="submit"
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
