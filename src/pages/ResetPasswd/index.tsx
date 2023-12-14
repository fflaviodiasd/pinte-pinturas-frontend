import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
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
import { Modal } from "../../components/Modal";

import { ResetPasswdData, UserContext } from "../../contexts/UserContext";
import { resetPasswdSchema } from "../../utils/schemas";

import logo from "../../assets/images/logo.png";

import { useStyles } from "./styles";

export const ResetPasswd = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPasswdData, resetPasswd } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    newPasswd: false,
    confirmPasswd: false,
  });

  const resetPassword = async (values: ResetPasswdData, token: string) => {
    const shouldOpen = await resetPasswd(values, token);
    setIsModalOpen(shouldOpen);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={resetPasswdData}
      onSubmit={(values) => {
        resetPassword(values, token || "");
      }}
      validationSchema={resetPasswdSchema}
    >
      {({ handleChange, values, errors }) => (
        <FormikForm>
          <Layout>
            <Paper className={classes.paper} elevation={5}>
              <div className={classes.loginContentContainer}>
                <div className={classes.imageContainer}>
                  <img src={logo} alt="Logo" className={classes.image} />
                </div>
                <Typography className={classes.formTitle}>
                  Redefinição de senha
                </Typography>
                <Typography className={classes.formInstruction}>
                  Para proteger sua conta, escolha uma senha que tenha pelo
                  menos 8 caracteres.
                </Typography>
                <div style={{ marginTop: 16 }}>
                  <TextField
                    name="newPasswd"
                    value={values.newPasswd}
                    onChange={handleChange}
                    label="Nova Senha"
                    placeholder="Nova Senha"
                    variant="outlined"
                    fullWidth
                    error={!!errors.newPasswd}
                    helperText={errors.newPasswd}
                    type={showPasswords.newPasswd ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowPasswords((prevState) => ({
                                ...prevState,
                                newPasswd: !prevState.newPasswd,
                              }))
                            }
                            edge="end"
                          >
                            {showPasswords.newPasswd ? (
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

                <div style={{ marginTop: 24 }}>
                  <TextField
                    name="confirmPasswd"
                    value={values.confirmPasswd}
                    onChange={handleChange}
                    label="Confirmação de Senha"
                    placeholder="Confirmação de Senha"
                    variant="outlined"
                    fullWidth
                    error={!!errors.confirmPasswd}
                    helperText={errors.confirmPasswd}
                    type={showPasswords.confirmPasswd ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowPasswords((prevState) => ({
                                ...prevState,
                                confirmPasswd: !prevState.confirmPasswd,
                              }))
                            }
                            edge="end"
                          >
                            {showPasswords.confirmPasswd ? (
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

                <Button className={classes.buttonLogin} fullWidth type="submit">
                  <Typography className={classes.buttonLoginText}>
                    Redefinir
                  </Typography>
                </Button>

                <Button
                  className={classes.buttonResetPasswd}
                  fullWidth
                  variant="text"
                  size="large"
                >
                  <Typography
                    className={classes.buttonResetPasswdText}
                    onClick={() => navigate("/")}
                  >
                    Voltar ao login
                  </Typography>
                </Button>
              </div>
            </Paper>
          </Layout>

          <Modal
            type="success"
            isModalOpen={isModalOpen}
            closeModal={() => navigate("/")}
            closeButtonText="Voltar ao Login"
          />
        </FormikForm>
      )}
    </Formik>
  );
};
