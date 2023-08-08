import { CssBaseline } from "@mui/material";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  return (
    <UserContextProvider>
      <CssBaseline />
      <Routes />
      <ToastContainer limit={3} transition={Slide} />
    </UserContextProvider>
  );
};
