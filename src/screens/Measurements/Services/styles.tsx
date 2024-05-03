/* eslint-disable react-refresh/only-export-components */
import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()(() => {
  return {
    content: {
      display: "flex",
      flexDirection: "row",
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 16,
      backgroundColor: "#EEE",
      flex: 1,
    },
    graphTitle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
    },
    labelContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
    },
    label: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    labelText: {
      color: "#8F9193",
      fontFamily: "Open Sans",
    },
    colunm1: {
      fontSize: 12,
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

type LabelColorProps = {
  color: string;
};

export const LabelColor = styled.div<LabelColorProps>`
  height: 14px;
  width: 14px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;

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

export const TableContainer2 = styled.div`
  flex: 1;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  margin-bottom: 8px;

  table {
    width: 120%;
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
    border-bottom: 1px solid #eee;
  }

  tbody {
    border-top: 1px solid #eee;
    tr {
      &:nth-child(even) {
        background-color: #fafafa;
      }
    }
  }
`;
