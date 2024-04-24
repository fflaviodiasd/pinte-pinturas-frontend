import { ReactNode } from "react";

import { Sidebar } from "./Sidebar";

import { Container, Content } from "./styles";

type LayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Sidebar />
      <Content>{children}</Content>
    </Container>
  );
};
