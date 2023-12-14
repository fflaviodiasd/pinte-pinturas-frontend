import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { Formik, Form as FormikForm } from "formik";

import { Layout } from "../../components/Layout";

import { LoginData, UserContext } from "../../contexts/UserContext";
import { loginSchema } from "../../utils/schemas";

import logo from "../../assets/images/logo.png";

import { useStyles } from "./styles";
import { Modal } from "../../components/Modal";

export const Login = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { login, loginData, loading } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signIn = async (values: LoginData) => {
    const shouldOpen = await login(values);
    setIsModalOpen(shouldOpen);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={loginData}
      onSubmit={(values) => {
        signIn(values);
      }}
      validationSchema={loginSchema}
    >
      {({ handleChange, values, errors }) => (
        <FormikForm>
          <Layout>
            <Paper className={classes.paper} elevation={5}>
              <div className={classes.loginContentContainer}>
                <div className={classes.imageContainer}>
                  <img src={logo} alt="Logo" className={classes.image} />
                </div>
                <Typography className={classes.formTitle}>Login</Typography>
                <div style={{ marginTop: 16 }}>
                  <TextField
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    label="E-mail"
                    placeholder="E-mail"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </div>

                <div style={{ marginTop: 24 }}>
                  <TextField
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    label="Senha"
                    placeholder="Senha"
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password}
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
                  disabled={loading}
                  type="submit"
                  fullWidth
                >
                  {loading ? (
                    <CircularProgress size={27} style={{ color: "#FFF" }} />
                  ) : (
                    <Typography className={classes.buttonLoginText}>
                      Entrar
                    </Typography>
                  )}
                </Button>

                <Button
                  className={classes.buttonResetPasswd}
                  fullWidth
                  variant="text"
                  size="large"
                >
                  <Typography
                    className={classes.buttonResetPasswdText}
                    onClick={() => navigate("/recuperacao-de-senha")}
                  >
                    Esqueceu sua senha?
                  </Typography>
                </Button>
              </div>
            </Paper>
          </Layout>

          <Modal
            type="warning"
            isModalOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
          />
        </FormikForm>
      )}
    </Formik>
  );
};
