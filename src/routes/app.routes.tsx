import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";

import { Home } from "../screens/Home";

import { Client } from "../screens/Clients";
import { ListClients } from "../screens/Clients/ListClients";

import { Collaborators } from "../screens/Collaborators";
import { ListCollaborators } from "../screens/Collaborators/ListCollaborators";

import { ListMaterials } from "../screens/Materials/ListMaterials";

import { Constructions } from "../screens/Constructions";
import { ListConstructions } from "../screens/Constructions/ListConstructions";
// import { FormConstructionsMultiStep } from "../screens/Constructions/FormConstructionsMultiStep";
import { Indicators } from "../screens/Constructions/Indicators";
import { Measurements } from "../screens/Measurements";

import { Settings } from "../screens/Settings";
import { Dashboard } from "../screens/Dashboard";
import { RegisterConstruction } from "../screens/Constructions/RegisterConstruction";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/clientes/cadastrar" element={<Client />} />
          <Route path="/clientes/:id" element={<Client />} />
          <Route path="/clientes/listagem" element={<ListClients />} />

          <Route path="/colaboradores/cadastrar" element={<Collaborators />} />
          <Route path="/colaboradores/:id" element={<Collaborators />} />
          <Route
            path="/colaboradores/listagem"
            element={<ListCollaborators />}
          />

          <Route path="/obras/cadastrar" element={<RegisterConstruction />} />
          {/* <Route
            path="/obras/cadastrar"
            element={<FormConstructionsMultiStep />}
          /> */}

          <Route path="/obras/funcionarios" element={<Indicators />} />

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
          <Route
            path="/obras/:id/conferencia-gerais-sistema"
            element={<Constructions />}
          />
          <Route
            path="/obras/:id/conferencia-dados-sistema"
            element={<Constructions />}
          />
          <Route
            path="/obras/:id/conferencia-producao-sistema"
            element={<Constructions />}
          />

          <Route path="/materiais" element={<ListMaterials />} />

          <Route path="/medicoes" element={<Measurements />} />

          {/* <Route path="/medicoes/pacotes" element={<Measurements />} /> */}

          <Route path="/configuracoes" element={<Settings />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/dashboard/acompanhamento" element={<Dashboard />} /> */}
          {/* <Route path="/dashboard/dados-gerais" element={<Dashboard />} /> */}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
