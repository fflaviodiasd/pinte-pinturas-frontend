import { Location } from "react-router-dom";

export const onlyNumbers = (string: string) => {
  return string.replace(/[^0-9]/g, "");
};

// Check if the page should disable some fields
export const inCreationOrEditing = (location: Location) => {
  return (
    location.pathname.includes("cadastrar") ||
    location.pathname.includes("editar")
  );
};

export const returnedTitlePage = (location: Location, screenName: string) => {
  if (location.pathname.includes("cadastrar")) {
    return `Cadastrar ${screenName}`;
  } else if (location.pathname.includes("editar")) {
    return `Editar ${screenName}`;
  } else {
    return screenName;
  }
};

export const returnedPhraseToModalDelete = (location: Location) => {
  switch (location.pathname) {
    case "/colaboradores":
      return "colaborador";
    case "/clientes":
      return "cliente";
    default:
      return "item";
  }
};

export const numberToPercentage = (number: number) => {
  return number.toFixed(2) + "%";
};
