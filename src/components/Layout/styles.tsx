import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()(() => {
  return {
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
      backgroundColor: "#dce4e8",
      overflowY: "hidden",
      position: "relative",
    },
    asideColorsContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 280,
      backgroundColor: "#2b658a",
      height: "110%",
      display: "flex",
      transform: "rotate(10.276deg)",
      marginTop: -40,
      marginLeft: -100,
      zIndex: 1,
    },
    redColor: {
      marginLeft: 120,
      width: 40,
      backgroundColor: "#DD3A3F",
    },
    greenColor: {
      width: 40,
      height: "105%",
      backgroundColor: "#639848",
    },
    yellowColor: {
      width: 40,
      height: "105%",
      backgroundColor: "#FFC42A",
    },
    blueColor: {
      width: 40,
      height: "105%",
      backgroundColor: "#3CB7D8",
    },
  };
});
