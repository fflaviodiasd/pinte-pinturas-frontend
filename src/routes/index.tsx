import { useContext } from "react";

import { UserContext } from "../contexts/UserContext";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => {
  const { isSigned } = useContext(UserContext);

  return isSigned ? <AppRoutes /> : <AuthRoutes />;
};
