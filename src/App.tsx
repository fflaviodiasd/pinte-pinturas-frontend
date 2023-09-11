import { CssBaseline } from "@mui/material";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserContextProvider } from "./contexts/UserContext";
import { Routes } from "./routes";

export const App = () => {
  return (
    <UserContextProvider>
      <CssBaseline />
      <Routes />
      <ToastContainer limit={3} transition={Slide} />
    </UserContextProvider>
  );
};
