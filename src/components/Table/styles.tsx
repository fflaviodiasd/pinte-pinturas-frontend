import { Grid } from "@mui/material";
import styled from "styled-components";

export const TableContainer = styled(Grid)`
  && {
    padding: 0 24px;
    margin-top: 12px;
  }
`;

export const TableSearchDelete = styled.div`
  max-width: 50px;
  position: absolute;
  top: 27%;
  right: 5%;
  color: "red";
  cursor: pointer;
  display: none;
  &.ativo {
    display: block;
  }
`;
