import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()(() => {
  return {
    container: {
      backgroundColor: "#EEE",
      paddingTop: 4,
      paddingBottom: 4,
      paddingLeft: 8,
    },
    content: {
      backgroundColor: "#FFF",
    },
    graphTitle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 4,
    },
    doughnutContainer: {
      width: 500,
      height: 500,
      marginTop: 12,
      marginBottom: 10,
      marginRight: 16,
      marginLeft: 16,
      position: "relative",
      display: "flex",
    },
    doughnutTextContainer: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      justifyContent: "center",
      width: 500,
      height: 500,
    },
    doughnutText: {
      color: "#8F9193",
      fontSize: 24,
      fontFamily: "Open Sans",
      textAlign: "center",
    },
    doughnutQuantity: {
      textAlign: "center",
      color: "#2E3132",
      fontSize: 36,
      fontFamily: "Open Sans",
    },
    labelContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      marginLeft: 18,
    },
    label: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 2,
    },
    labelText: {
      color: "#8F9193",
      fontFamily: "Open Sans",
    },
    labelQuantity: {
      color: "#2E3132",
      fontFamily: "Open Sans",
      fontSize: 30,
      lineHeight: 1,
      marginBottom: 2,
    },
    labelPercentage: {
      color: "#8F9193",
      fontFamily: "Open Sans",
      fontStyle: "italic",
      lineHeight: 1,
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
