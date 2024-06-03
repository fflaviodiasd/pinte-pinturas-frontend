import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()(() => {
  return {
    container: {
      backgroundColor: "#EEE",
      paddingTop: 4,
      paddingBottom: 4,
      paddingRight: 8,
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
