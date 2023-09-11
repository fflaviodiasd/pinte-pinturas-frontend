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
