import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => {
  return {
    paper: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
    },
    searchBarContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",

      padding: 12,
    },
    searchBarInputsContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    searchBarInput: {
      width: 250,
      marginRight: 12,
    },
    searchBarFilter: {
      width: 250,
    },
    searchBarActionButtonsContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    buttonDelete: {
      borderRadius: "20%",
      color: "#D3D3D3",
      backgroundColor: "#FFF",
      border: "1px solid #D3D3D3",
      transition: ".5 ease",
      "&:hover": {
        backgroundColor: "#FF9395",
      },
    },
    buttonFilter: {
      marginLeft: 12,
      borderRadius: "20%",
      color: "#FFF",
      backgroundColor: "#2F4D7C",
      transition: ".5 ease",
      "&:hover": {
        backgroundColor: "rgba(47,77,124,0.8)",
      },
    },
    buttonRegister: {
      width: 140,
      fontSize: 14,
      fontWeight: "bold",
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 30,
      paddingLeft: 30,
      marginLeft: 12,
      color: "#FFF",
      textTransform: "capitalize",
      transition: ".5s ease",
      backgroundColor: "#9c27b0",
      "&:hover": {
        backgroundColor: "rgba(156,39,176,0.8)",
      },
      borderRadius: 5,
      textDecoration: "none",
    },
  };
});
