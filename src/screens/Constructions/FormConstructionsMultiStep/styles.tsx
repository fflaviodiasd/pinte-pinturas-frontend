import { makeStyles } from "tss-react/mui";
import { styled } from "@mui/material/styles";
import { Switch, SwitchProps } from "@mui/material";

export const useStyles = makeStyles()((theme) => {
  return {
    paper: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
    },
    formContainer: {
      padding: theme.spacing(1),
    },
    actionBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
    },
    actionBarLeftContent: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    pageSubtitle: {
      color: "#252525",
      fontSize: 20,

      marginLeft: theme.spacing(2),
    },

    buttonSave: {
      fontFamily: "Open Sans",
      fontSize: 16,
      fontWeight: 600,
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 22,
      paddingLeft: 22,
      color: "#FFF",
      textTransform: "capitalize",
      transition: ".5s ease",
      backgroundColor: "#0076BE",
      "&:hover": {
        backgroundColor: "#0076BE",
      },
      borderRadius: 5,
      textDecoration: "none",
    },
  };
});

export const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#0076be' : '#0076be',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));
