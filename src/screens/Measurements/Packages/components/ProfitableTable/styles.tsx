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
      overflow: "auto",
      scrollbarWidth: "thin",
    },
    content: {
      height: "50%",
      flex: 1,
    },
    titleTable: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    emptyDataContainer: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    emptyDataText: {
      fontFamily: "Open Sans",
      color: "#999",
    },
    moreProfitableIcon: {
      color: "#4caf50",
    },
    moreProfitableTitle: {
      fontFamily: "Open Sans",
      fontWeight: 600,
      color: "#4caf50",
    },
    lessProfitableIcon: {
      color: "#ffa51f",
      transform: "scaleX(-1)",
    },
    lessProfitableTitle: {
      fontFamily: "Open Sans",
      fontWeight: 600,
      color: "#ffa51f",
    },
    colunm: {
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
    font-size: 14px;
    font-family: "Open Sans";
    font-weight: 600;
    color: #2e3132;
    text-align: left;
  }

  td {
    &:first-child {
      width: 50%;
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
