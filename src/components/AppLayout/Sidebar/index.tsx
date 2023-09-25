/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer as MuiDrawer,
  List,
  IconButton,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  GroupOutlined as UsersIcon,
  ExitToAppOutlined as ExitIcon,
  HomeOutlined as HomeOutlinedIcon,
  PetsOutlined as PetsOutlinedIcon,
  FactCheckOutlined as FactCheckOutlinedIcon,
  TrendingUpOutlined as TrendingUpOutlinedIcon,
  ShoppingBagOutlined as ShoppingBagOutlinedIcon,
  StickyNote2Outlined as StickyNote2OutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  MedicalServicesOutlined as MedicalServicesOutlinedIcon,
  MenuOpenOutlined as MenuOpenOutlinedIcon,
} from "@mui/icons-material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, Theme, CSSObject } from "@mui/material/styles";

// import logoShortImage from "../../../assets/images/logo-short-image.png";
// import logoImage from "../../../assets/images/logo-image.png";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#16A34A",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#16A34A",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  marginLeft: "64px",
  width: `calc(100% - 64px)`,
  backgroundColor: "#FFF",
  boxShadow: "none",
  borderBottom: "1px solid #EEE",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuList = [
  // {
  //   itemTitle: "Início",
  //   itemLocation: "/home",
  //   icon: (
  //     <HomeOutlinedIcon
  //       fontSize="small"
  //       style={{
  //         marginRight: 12,
  //       }}
  //     />
  //   ),
  // },
  {
    itemTitle: "Cadastros",
    itemLocation: "/cadastros",
    icon: (
      <FactCheckOutlinedIcon
        fontSize="small"
        style={{
          marginRight: 12,
        }}
      />
    ),
  },

  {
    itemTitle: "Configurações",
    itemLocation: "/configuracoes",
    icon: (
      <AccountCircleOutlinedIcon
        fontSize="small"
        style={{
          marginRight: 12,
        }}
      />
    ),
  },
];

export const Sidebar = () => {
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            style={{
              fontSize: 16,
              color: "#202025",
              margin: "0 12px",
              textTransform: "capitalize",
            }}
          >
            Olá, John Doe
          </Typography>
          <IconButton size="large" onClick={() => localStorage.clear()}>
            <ExitIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            display: "flex",
            justifyContent: !open ? "center" : "",
          }}
        >
          <IconButton onClick={handleDrawer} style={{ color: "#FFF" }}>
            {open ? (
              <MenuOpenOutlinedIcon />
            ) : (
              <MenuOpenOutlinedIcon style={{ transform: "scaleX(-1)" }} />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            color: "#FFF",
            padding: open ? "12px 0" : "29px 0",
          }}
        >
          {open ? (
            <img src={logoImage} alt="pinte-pinturas" style={{ width: "100%" }} />
          ) : (
            <img src={logoShortImage} alt="pinte-pinturas" />
          )}
        </div> */}
        <List style={{ padding: 0 }}>
          {menuList.map((item) => (
            <ListItem
              key={item.itemTitle}
              to={item.itemLocation}
              component={Link}
              // selected={location.pathname.includes(item.itemLocation)}
              style={{
                color: location.pathname.includes(item.itemLocation)
                  ? "#FFF"
                  : "#4F4F4F",
                backgroundColor: location.pathname.includes(item.itemLocation)
                  ? "#af52bf"
                  : "#FFF",
              }}
            >
              {item.icon}

              <ListItemText>
                <Typography
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {item.itemTitle}
                </Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
