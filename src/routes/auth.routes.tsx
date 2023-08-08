import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { Login } from "../pages/Login";

export const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
