import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";

import { Home } from "../screens/Home";

import { FormClientsMultiStep } from "../screens/Clients/FormClientsMultiStep";
import { ListClients } from "../screens/Clients/ListClients";

import { FormCollaboratorsMultiStep } from "../screens/Collaborators/FormCollaboratorsMultiStep";
import { ListCollaborators } from "../screens/Collaborators/ListCollaborators";

import { Settings } from "../screens/Settings";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route
            path="/clientes/cadastrar"
            element={<FormClientsMultiStep />}
          />
          <Route path="/clientes/:id" element={<FormClientsMultiStep />} />
          <Route path="/clientes/listagem" element={<ListClients />} />

          <Route
            path="/colaboradores/cadastrar"
            element={<FormCollaboratorsMultiStep />}
          />
          <Route
            path="/colaboradores/:id"
            element={<FormCollaboratorsMultiStep />}
          />
          <Route
            path="/colaboradores/listagem"
            element={<ListCollaborators />}
          />

          <Route path="/configuracoes" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
