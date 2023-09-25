import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";

import { Home } from "../screens/Home";
import { Settings } from "../screens/Settings";
import { ListConstructions } from "../screens/Constructions/ListConstructions";
import { DetailsConstruction } from "../screens/Constructions/DetailsConstruction";
import { ListCollaborators } from "../screens/Collaborators/ListCollaborators";
import { FormCollaborators } from "../screens/Collaborators/FormCollaborators";
import { ListClients } from "../screens/Clients/ListClients";
import { FormClients } from "../screens/Clients/FormClients";
import { DetailsArea } from "../screens/Areas/DetailsArea";

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
          <Route path="/obras/cadastrar" element={<DetailsConstruction />} />
          <Route path="/obras/:id" element={<DetailsConstruction />} />
          <Route path="/obras/:id/editar" element={<DetailsConstruction />} />

          <Route path="/obras/:id/areas/cadastrar" element={<DetailsArea />} />
          <Route path="/obras/:id/areas/:areaId" element={<DetailsArea />} />
          <Route
            path="/obras/:id/areas/:areaId/editar"
            element={<DetailsArea />}
          />

          {/* <Route path="/areas" element={<ListConstructions />} /> */}
          <Route path="/areas/cadastrar" element={<DetailsArea />} />
          <Route path="/areas/:areaId" element={<DetailsArea />} />
          <Route path="/areas/:areaId/editar" element={<DetailsArea />} />

          <Route path="/configuracoes" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};
