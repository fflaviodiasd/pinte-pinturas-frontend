import { Typography } from "@mui/material";
import styled from "styled-components";

export const Button = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem 0 1rem;
`;

type ButtonTextContainerProps = {
  isactive: boolean;
};

export const ButtonText = styled(Typography)`
  && {
    font-family: "Open Sans", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
  }
`;

export const ButtonTextContainer = styled.div<ButtonTextContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 0.5rem 0.5rem 0px 0px;
  padding: 0.25rem 1rem 0.25rem 1rem;
  color: ${({ isactive }) => (isactive ? "#FFF" : "#0076BE")};
  font-weight: bold;
  background-color: ${({ isactive }) => (isactive ? "#0076BE" : "none")};
  cursor: pointer;
`;
