/* eslint-disable @typescript-eslint/no-unused-vars */
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";

import { Home } from "../screens/Home";

import { Client } from "../screens/Clients";
import { ListClients } from "../screens/Clients/ListClients";

import { Collaborators } from "../screens/Collaborators";
import { ListCollaborators } from "../screens/Collaborators/ListCollaborators";

import { ListMaterials } from "../screens/Materials/ListMaterials";

import { RegisterConstruction } from "../screens/Constructions/RegisterConstruction/";
import { ListConstructions } from "../screens/Constructions/ListConstructions";

import { Indicators } from "../screens/Constructions/Indicators";
import { Measurements } from "../screens/Measurements";

import { Settings } from "../screens/Settings";
import { Dashboard } from "../screens/Dashboard";
import { Appointments } from "../screens/Appointments";
import { EmployeesConstruction } from "../screens/Constructions/EmployeesConstruction";

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

          <Route
            path="/obras/cadastrar/dados-gerais"
            element={<RegisterConstruction />}
          />
          <Route
            path="/obras/cadastrar/endereco"
            element={<RegisterConstruction />}
          />

          <Route path="/obras/:id/locais" element={<RegisterConstruction />} />
          <Route path="/obras/:id/locais/checklist/:checklistid" element={<RegisterConstruction />} />
          <Route
            path="/obras/:id/dados-gerais"
            element={<RegisterConstruction />}
          />
          <Route
            path="/obras/:id/endereco"
            element={<RegisterConstruction />}
          />
          <Route
            path="/obras/:id/supervisores"
            element={<RegisterConstruction />}
          />
          <Route
            path="/obras/:id/encarregados-cliente"
            element={<RegisterConstruction />}
          />
          <Route
            path="/obras/:id/materiais"
            element={<RegisterConstruction />}
          />
          <Route
            path="/obras/:id/funcionarios"
            element={<EmployeesConstruction />}
          />
          <Route path="/obras/:id/equipes" element={<RegisterConstruction />} />
          <Route
            path="/obras/:id/servicos"
            element={<RegisterConstruction />}
          />
          <Route path="/obras/:id/pacotes" element={<RegisterConstruction />} />
          <Route
            path="/obras/:id/medicoes"
            element={<RegisterConstruction />}
          />

          <Route path="/obras/funcionarios" element={<Indicators />} />
          <Route path="/obras/listagem" element={<ListConstructions />} />

          <Route path="/materiais" element={<ListMaterials />} />

          <Route path="/medicoes" element={<Measurements />} />

          {/* <Route path="/medicoes/pacotes" element={<Measurements />} /> */}

          <Route path="/configuracoes" element={<Settings />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/dashboard/acompanhamento" element={<Dashboard />} />
          <Route path="/dashboard/dados-gerais" element={<Dashboard />} />
          <Route path="/dashboard/layout" element={<Dashboard />} />

          <Route
            path="/apontamentos/dados-do-sistema"
            element={<Appointments />}
          />
          <Route
            path="/apontamentos/medicoes-do-sistema"
            element={<Appointments />}
          />
          <Route
            path="/apontamentos/producao-do-sistema"
            element={<Appointments />}
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
