import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";

import { Home } from "../screens/Home";
import { Settings } from "../screens/Settings";
import { Registers } from "../screens/Registers";
import { Constructions } from "../screens/Constructions";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastros" element={<Registers />} />
          <Route path="/obras" element={<Constructions />} />
          <Route path="/configuracoes" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
