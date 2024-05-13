/* eslint-disable react-refresh/only-export-components */
import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()(() => {
  return {
    profitableContainer: {
      backgroundColor: "#FFF",
      marginLeft: 16,
      padding: 16,
      height: "calc(100vh - 164px)",
    },
    colunm1: {
      fontSize: 14,
      fontFamily: "Open Sans",
      color: "#2E3132",
      padding: 4,
    },
    colunm2: {
      fontSize: 14,
      fontFamily: "Open Sans",
      color: "#2E3132",
      padding: 4,
    },
  };
});

export const TableContainer = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
  }

  th {
    font-family: "Open Sans";
    font-weight: 600;
    color: #2e3132;
    text-align: left;
  }

  td {
    &:first-child {
      width: 60%;
    }
  }

  tbody {
    tr {
      &:nth-child(odd) {
        background-color: #eeeeee;
      }
    }
  }
`;
