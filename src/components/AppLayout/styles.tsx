/* eslint-disable react-refresh/only-export-components */
import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Content = styled.main`
  flex-grow: 1;
  height: 100%;
`;

export const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
      height: "100vh",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      height: "100%",
    },
  };
});
