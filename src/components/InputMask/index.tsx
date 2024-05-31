import { useRef } from "react";
import MaskedInput from "react-text-mask";

interface InputMaskProps {
  inputRef?: React.Ref<MaskedInput>;
  name: string;
}

export const InputMask = (props: InputMaskProps) => {
  const { inputRef, ...other } = props;
  let maskInput: (string | RegExp)[] = [];

  switch (props.name) {
    case "cpf":
      maskInput = [
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ];
      break;
    case "cnpj":
      maskInput = [
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        ".",
        /\d/,
        /\d/,
        /\d/,
        "/",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ];
      break;
    case "cell_phone":
      maskInput = [
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
      break;
    case "phone":
      maskInput = [
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
      break;
    case "phoneNumber":
      maskInput = [
        "(",
        /[1-9]/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
      break;
    case "cep":
      maskInput = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];
      break;
    default:
      maskInput = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
      break;
  }

  const ref = useRef<MaskedInput>(null);

  return (
    <MaskedInput
      {...other}
      ref={inputRef ?? ref}
      mask={maskInput}
      placeholderChar={"\u2000"}
    />
  );
};
