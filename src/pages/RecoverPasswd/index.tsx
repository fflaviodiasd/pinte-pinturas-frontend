import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Formik, Form as FormikForm } from "formik";

import { Modal } from "../../components/Modal";
import { Layout } from "../../components/Layout";

import { RecoverPasswdData, UserContext } from "../../contexts/UserContext";
import { recoverPasswdSchema } from "../../utils/schemas";

import logo from "../../assets/images/logo.png";

import { useStyles } from "./styles";

export const RecoverPasswd = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { recoverPasswdData, recoverPasswd, loading } = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const recoverPassword = async (values: RecoverPasswdData) => {
    const shouldOpen = await recoverPasswd(values);
    setIsModalOpen(shouldOpen);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={recoverPasswdData}
      onSubmit={(values) => {
        recoverPassword(values);
      }}
      validationSchema={recoverPasswdSchema}
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
                  Recuperação de senha
                </Typography>
                <Typography className={classes.formInstruction}>
                  Informe seu e-mail e enviaremos instruções de redefinição de
                  senha para você.
                </Typography>
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

                <Button className={classes.buttonLogin} fullWidth type="submit">
                  {loading ? (
                    <CircularProgress size={27} style={{ color: "#FFF" }} />
                  ) : (
                    <Typography className={classes.buttonLoginText}>
                      Solicitar
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
            closeModal={() => setIsModalOpen(false)}
          />
        </FormikForm>
      )}
    </Formik>
  );
};
