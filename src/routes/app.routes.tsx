import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";

import { Home } from "../screens/Home";
import { Settings } from "../screens/Settings";
import { ListConstructions } from "../screens/Constructions/ListConstructions";
import { ListClients } from "../screens/Clients/ListClients";
import { ListCollaborators } from "../screens/Collaborators/ListCollaborators";
import { FormCollaborators } from "../screens/Collaborators/FormCollaborators";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/colaboradores" element={<ListCollaborators />} />
          <Route
            path="/colaboradores/cadastrar"
            element={<FormCollaborators />}
          />
          <Route path="/colaboradores/:id" element={<FormCollaborators />} />
          <Route
            path="/colaboradores/:id/editar"
            element={<FormCollaborators />}
          />

          <Route path="/clientes" element={<ListClients />} />

          <Route path="/obras" element={<ListConstructions />} />
          <Route path="/configuracoes" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
