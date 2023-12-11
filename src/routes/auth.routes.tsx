import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { Login } from "../pages/Login";
import { RecoverPasswd } from "../pages/RecoverPasswd";
import { ResetPasswd } from "../pages/ResetPasswd";

export const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperacao-de-senha" element={<RecoverPasswd />} />
        <Route path="/reset-de-senha" element={<ResetPasswd />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
