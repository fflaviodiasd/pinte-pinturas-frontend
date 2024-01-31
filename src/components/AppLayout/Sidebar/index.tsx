import { useState, ReactElement, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import {
  Business,
  Badge,
  ExpandLess,
  ExpandMore,
  Menu,
} from "@mui/icons-material";

import logoImage from "../../../assets/images/logo.png";

import { Drawer, DrawerHeader } from "./styles";

interface NavItem {
  text: string;
  path: string;
  icon: ReactElement;
}

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openClientsItemMenu, setOpenClientsItemMenu] = useState(false);

  const handleDrawer = () => {
    setOpenSidebar(!openSidebar);
    if (openSidebar) {
      setOpenClientsItemMenu(false);
    }
  };

  const handleClientsList = () => {
    setOpenClientsItemMenu(!openClientsItemMenu);
  };

  const navItems: NavItem[] = [
    { text: "Clientes", path: "/clientes", icon: <Business /> },
    { text: "Funcionários", path: "/colaboradores/cadastrar", icon: <Badge /> },
  ];

  const returnedIcon = (openClientsItemMenu: boolean) => {
    if (openClientsItemMenu) {
      return <ExpandLess />;
    }

    return <ExpandMore />;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={openSidebar}>
        {/* Container Logo */}
        <div
          style={{
            display: openSidebar ? "flex" : "none",
            justifyContent: "center",
            height: 140,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={logoImage}
              alt="Logo"
              style={{ height: "30%", width: "50%" }}
            />
            <div
              style={{
                color: "#0076BE",
                fontFamily: "Open Sans",
                fontWeight: "600",
                fontSize: "1.125rem",
                lineHeight: "1.625rem",
              }}
            >
              Pinte Pinturas
            </div>
          </Box>
        </div>

        {/* Drawer */}
        <DrawerHeader
          style={{
            display: "flex",
            justifyContent: !openSidebar ? "center" : "flex-start",
            margin: 0,
          }}
        >
          <IconButton
            onClick={() => {
              handleDrawer();
            }}
            style={{ color: "#0076BE" }}
          >
            <Menu />
          </IconButton>
        </DrawerHeader>

        <List>
          {navItems.map((navItem) => {
            const { path } = navItem;
            const isActive = location.pathname.includes(path);

            return (
              <Fragment key={navItem.text}>
                {/* IsActive */}
                <ListItem
                  disablePadding
                  sx={{
                    display: "block",
                    backgroundColor: isActive ? "#DEF4FF" : "",
                  }}
                >
                  {/* Navigation */}
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: openSidebar ? "initial" : "center",
                      px: 2.5,
                    }}
                    onClick={() => {
                      if (path !== "/clientes") {
                        navigate(`${path}`);
                      } else {
                        handleClientsList();
                        setOpenSidebar(true);
                      }
                    }}
                  >
                    {/*Icons */}
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: openSidebar ? 3 : "auto",
                        justifyContent: "center",
                        color: isActive ? "#0076BE" : "#2E3132",
                      }}
                    >
                      {navItem.icon}
                    </ListItemIcon>

                    {/* Text */}
                    <ListItemText
                      primary={navItem.text}
                      sx={{
                        opacity: openSidebar ? 1 : 0,
                        fontFamily: "Open Sans",
                        fontWeight: "600",
                        fontSize: "1rem",
                        lineHeight: "1.625rem",
                        color: isActive ? "#0076BE" : "#2E3132",
                        letterSpacing: "2px",
                      }}
                    />
                    {openSidebar &&
                      path === "/clientes" &&
                      returnedIcon(openClientsItemMenu)}
                  </ListItemButton>
                </ListItem>

                {/*Collapse */}
                {path === "/clientes" && (
                  <Collapse
                    in={openClientsItemMenu}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <ListItem
                        sx={{
                          backgroundColor: location.pathname.includes(
                            "/clientes/cadastrar"
                          )
                            ? "#0076BE"
                            : "#EBF4FA",
                        }}
                      >
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText
                            primary="• Cadastro"
                            onClick={() => navigate("/clientes/cadastrar")}
                            sx={{
                              fontFamily: "Open Sans",
                              fontSize: "1rem",
                              color: location.pathname.includes(
                                "/clientes/cadastrar"
                              )
                                ? "#FFFFFF"
                                : "#2E3132",
                              fontWeight: 600,
                              lineHeight: "1.625rem",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem
                        sx={{
                          backgroundColor: location.pathname.includes(
                            "/clientes/listagem"
                          )
                            ? "#0076BE"
                            : "#EBF4FA",
                        }}
                      >
                        <ListItemButton sx={{ pl: 4 }}>
                          <ListItemText
                            primary="• Listagem"
                            onClick={() => navigate("/clientes/listagem")}
                            sx={{
                              fontFamily: "Open Sans",
                              fontSize: "1rem",
                              color: location.pathname.includes(
                                "/clientes/listagem"
                              )
                                ? "#FFFFFF"
                                : "#2E3132",
                              fontWeight: 600,
                              lineHeight: "1.625rem",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Collapse>
                )}
              </Fragment>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};
