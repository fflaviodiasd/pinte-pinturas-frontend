import { useState, ReactElement, Fragment, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer as MuiDrawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Home, Logout, Menu } from "@mui/icons-material";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { UserContext } from "../../../contexts/UserContext";

interface NavItem {
  text: string;
  path: string;
  icon: ReactElement;
}

const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#11459F",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#11459F",
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

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsSigned } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const navItems: NavItem[] = [{ text: "Home", path: "/", icon: <Home /> }];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            display: "flex",
            justifyContent: !open ? "center" : "flex-start",
            margin: 0,
          }}
        >
          <IconButton onClick={handleDrawer} style={{ color: "#FFF" }}>
            <Menu />
          </IconButton>
        </DrawerHeader>

        <List>
          {navItems.map((navItem) => {
            const { path } = navItem;
            const isActive = location.pathname.includes(path);

            return (
              <Fragment key={navItem.text}>
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                    color: "#FFF",
                    backgroundColor: isActive ? "#389FFF" : "",
                  }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => navigate(`${path}`)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: "#FFF",
                      }}
                    >
                      {navItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={navItem.text}
                      sx={{
                        opacity: open ? 1 : 0,
                        font: "normal normal normal 20px/24px Calibri",
                        color: "#FFFFFF",
                        letterSpacing: "2px",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Fragment>
            );
          })}

          <ListItem
            disablePadding
            sx={{
              display: "block",
              color: "#FFF",
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={() => {
                setIsSigned(false);
                localStorage.clear();
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                  color: "#FFF",
                }}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText
                primary="Sair"
                sx={{
                  opacity: open ? 1 : 0,
                  font: "normal normal normal 20px/24px Calibri",
                  color: "#FFFFFF",
                  letterSpacing: "2px",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};
