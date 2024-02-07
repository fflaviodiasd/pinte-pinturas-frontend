import { ReactNode } from "react";
import { Grid } from "@mui/material";

import { Sidebar } from "./Sidebar";

import { Container } from "./styles";

type LayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: LayoutProps) => (
  <Container>
    <Sidebar />
    <Grid container>{children}</Grid>
  </Container>
);
