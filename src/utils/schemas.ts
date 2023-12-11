/* eslint-disable no-useless-escape */
import * as Yup from "yup";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Campo obrigatório")
    .matches(emailRegex, "E-mail inválido"),
  password: Yup.string().required("Campo obrigatório"),
});

export const recoverPasswdSchema = Yup.object().shape({
  email: Yup.string()
    .required("Campo obrigatório")
    .matches(emailRegex, "E-mail inválido"),
});

export const resetPasswdSchema = Yup.object().shape({
  newPasswd: Yup.string()
    .required("Campo obrigatório")
    .matches(passwordRegex, "Mínimo de 8 caracteres"),
  confirm: Yup.string()
    .required("Campo obrigatório")
    .matches(passwordRegex, "Confirmação de senha deve ser igual a nova senha"),
});
