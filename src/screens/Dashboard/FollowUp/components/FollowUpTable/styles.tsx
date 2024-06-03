import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()(() => {
  return {
    container: {
      backgroundColor: "#EEE",
      paddingTop: 8,
    },
    content: {
      backgroundColor: "#FFF",
    },
    dataTableContainer: {
      display: "flex",
      paddingTop: 12,
      paddingLeft: 12,
      paddingBottom: 12,
      flexDirection: "column",
      marginTop: 12,
    },
    columnTitleMedium: {
      width: 100,
      fontSize: 18,
      fontFamily: "Open Sans",
      fontWeight: 600,
      color: "#2E3132",
    },
    columnTitleSmall: {
      width: 50,
      fontSize: 18,
      fontFamily: "Open Sans",
      fontWeight: 600,
      color: "#2E3132",
    },
    cell: {
      fontSize: 14,
      fontFamily: "Open Sans",
      color: "#2E3132",
      padding: 4,
    },
    totalResultsText: {
      fontFamily: "Open Sans",
      color: "#2E3132",
      fontSize: 14,
    },
    emptyDataContainer: {
      height: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    emptyDataText: {
      fontFamily: "Open Sans",
      color: "#999",
    },
  };
});

export const TableContainer = styled.div`
  flex: 1;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  margin-bottom: 8px;

  table {
    width: 100%;
    border-collapse: collapse;
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

type LabelColorProps = {
  color: string;
};

export const LabelColor = styled.div<LabelColorProps>`
  height: 12px;
  width: 12px;
  margin-right: 4px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`;
