import { makeStyles } from "tss-react/mui";
import styled from "styled-components";

export const useStyles = makeStyles()(() => {
  return {
    container: {
      display: "flex",
      backgroundColor: "#EEE",
      paddingTop: 12,
      marginBottom: 4,
      overflowX: "scroll",
      scrollbarWidth: "thin",
    },
    content: {
      backgroundColor: "#EEE",
      display: "flex",
      width: 1800,
      // overflowX: "scroll",
      // scrollbarWidth: "thin",
    },
    cardContainer: {
      width: 292,
      padding: 16,
      backgroundColor: "#FFF",
      marginRight: 16,
    },
    cardContent: {
      display: "flex",
      alignItems: "center",
    },
    avatar: {
      margin: 8,
      height: 50,
      width: 50,
    },
    userData: {
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
    },
    userName: {
      color: "#2E3132",
      fontFamily: "Open Sans",
      fontWeight: 600,
      fontSize: 18,
    },
    userTimeContainer: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      color: "#8F9193",
    },
    userTimeIcon: {
      fontSize: 20,
    },
    userTimeText: {
      fontSize: 14,
      fontFamily: "Open Sans",
      marginLeft: 4,
    },
    labelContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    label: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: 130,
      paddingLeft: 8,
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
