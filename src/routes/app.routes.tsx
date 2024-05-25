import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";

import { Home } from "../screens/Home";

import { FormClientsMultiStep } from "../screens/Clients/FormClientsMultiStep";
import { ListClients } from "../screens/Clients/ListClients";

import { FormCollaboratorsMultiStep } from "../screens/Collaborators/FormCollaboratorsMultiStep";
import { ListCollaborators } from "../screens/Collaborators/ListCollaborators";

import { ListMaterials } from "../screens/Materials/ListMaterials";

import { ListConstructions } from "../screens/Constructions/ListConstructions";
import { Constructions } from "../screens/Constructions";
import { FormConstructionsMultiStep } from "../screens/Constructions/FormConstructionsMultiStep";

import { Measurements } from "../screens/Measurements";

import { Settings } from "../screens/Settings";
import { Dashboard } from "../screens/Dashboard";

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
          <Route
            path="/obras/cadastrar"
            element={<FormConstructionsMultiStep />}
          />

          <Route path="/obras/listagem" element={<ListConstructions />} />

          <Route path="/obras/:id/materiais" element={<Constructions />} />
          <Route path="/obras/:id/equipes" element={<Constructions />} />
          <Route path="/obras/:id/locais" element={<Constructions />} />
          <Route path="/obras/:id/servicos" element={<Constructions />} />
          <Route path="/obras/:id/pacotes" element={<Constructions />} />
          <Route path="/obras/:id/medicoes" element={<Constructions />} />
          <Route path="/obras/:id/supervisores" element={<Constructions />} />
          <Route
            path="/obras/:id/encarregados-cliente"
            element={<Constructions />}
          />

          <Route path="/materiais" element={<ListMaterials />} />

          <Route path="/medicoes" element={<Measurements />} />

          {/* <Route path="/medicoes/pacotes" element={<Measurements />} /> */}

          <Route path="/configuracoes" element={<Settings />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/acompanhamento" element={<Dashboard />} />
          <Route path="/dashboard/dados-gerais" element={<Dashboard />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
