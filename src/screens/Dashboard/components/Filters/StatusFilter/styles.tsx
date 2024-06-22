import { Typography } from "@mui/material";
import styled from "styled-components";

type CheckboxLabelProps = {
  color: string;
};

export const CheckboxLabel = styled(Typography)<CheckboxLabelProps>`
  && {
    font-family: "Open Sans", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: #fff;
    padding: 2px 12px;
    border-radius: 20px;
    background-color: ${({ color }) => color};
  }
`;
