import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";

import { Home } from "../screens/Home";
import { Settings } from "../screens/Settings";
import { ListConstructions } from "../screens/Constructions/ListConstructions";
import { FormConstructions } from "../screens/Constructions/FormConstructions";
import { ListCollaborators } from "../screens/Collaborators/ListCollaborators";
import { FormCollaborators } from "../screens/Collaborators/FormCollaborators";
import { ListClients } from "../screens/Clients/ListClients";
import { FormClients } from "../screens/Clients/FormClients";

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
          <Route path="/clientes/cadastrar" element={<FormClients />} />
          <Route path="/clientes/:id" element={<FormClients />} />
          <Route path="/clientes/:id/editar" element={<FormClients />} />

          <Route path="/obras" element={<ListConstructions />} />
          <Route path="/obras/cadastrar" element={<FormConstructions />} />
          <Route path="/obras/:id" element={<FormConstructions />} />
          <Route path="/obras/:id/editar" element={<FormConstructions />} />

          <Route path="/configuracoes" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
