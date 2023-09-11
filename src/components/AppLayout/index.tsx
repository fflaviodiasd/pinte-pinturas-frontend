import { useState, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Tooltip,
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  GroupOutlined as UsersIcon,
  ExitToAppOutlined as ExitIcon,
  FactCheckOutlined as FactCheckOutlinedIcon,
  AccountCircleOutlined as AccountCircleOutlinedIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { useStyles } from "./styles";
import { KEY_SIGNED } from "../../utils/consts";

type AppLayoutProps = {
  children: ReactNode;
};

const drawerWidth = 240;

const menuList = [
  //   {
  //     itemTitle: "Início",
  //     itemLocation: "/home",
  //     icon: (
  //       <HomeOutlinedIcon
  //         fontSize="small"
  //         style={{
  //           marginRight: 12,
  //         }}
  //       />
  //     ),
  //   },
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

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { classes } = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar style={{ backgroundColor: "#6d1b7b" }}>
        <div
          style={{
            height: 60,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onClick={() => navigate("/")}
        >
          {/* <img
            src={logoImage}
            alt="logo"
            style={{
              width: "92%",
            }}
          /> */}
          <Typography>Pinte Pinturas</Typography>
        </div>
      </Toolbar>
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
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Typography
              style={{ color: "#FFF", fontWeight: 700, marginRight: 12 }}
            >
              Olá, Administrador
            </Typography>
            <Tooltip title="Sair">
              <IconButton
                aria-label="sair"
                onClick={() => {
                  localStorage.setItem(KEY_SIGNED, JSON.stringify(false));
                  window.location.reload();
                }}
              >
                <ExitIcon style={{ color: "#FFF" }} />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};
