import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { Layout } from "../components/Layout";

import { Home } from "../screens/Home";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
