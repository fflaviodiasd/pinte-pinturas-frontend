import { useState, ReactElement, Fragment, useContext } from "react";
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
  Link,
} from "@mui/material";

import {
  Business,
  Badge,
  ExpandLess,
  ExpandMore,
  Menu,
  Logout,
} from "@mui/icons-material";

import logoImage from "../../../assets/images/logo.png";
import { Drawer, DrawerHeader } from "./styles";
import { UserContext } from "../../../contexts/UserContext";

interface NavItem {
  text: string;
  path: string;
  icon?: ReactElement;
  subItems?: NavItem[];
}

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setIsSigned } = useContext(UserContext);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openClientsItemMenu, setOpenClientsItemMenu] = useState(false);
  const [openEmployeesItemMenu, setOpenEmployeesItemMenu] = useState(false);

  const handleDrawer = () => {
    setOpenSidebar(!openSidebar);
    if (openSidebar) {
      setOpenClientsItemMenu(false);
      setOpenEmployeesItemMenu(false);
    }
  };

  const handleClientsList = () => {
    setOpenClientsItemMenu(!openClientsItemMenu);
  };

  const handleEmployeesList = () => {
    setOpenEmployeesItemMenu(!openEmployeesItemMenu);
  };

  const navItems: NavItem[] = [
    {
      text: "Clientes",
      path: "/clientes",
      icon: <Business />,
      subItems: [
        { text: "• Cadastro", path: "/clientes/cadastrar" },
        { text: "• Listagem", path: "/clientes/listagem" },
      ],
    },
    {
      text: "Funcionários",
      path: "/colaboradores",
      icon: <Badge />,
      subItems: [
        { text: "• Cadastro", path: "/colaboradores/cadastrar" },
        { text: "• Listagem", path: "/colaboradores/listagem" },
      ],
    },
    {
      text: "Materiais",
      path: "/materiais",
      icon: <Badge />,
    },
  ];

  const returnedIcon = (isOpen: boolean) => {
    if (isOpen) {
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
            const { path, subItems } = navItem;
            const isActive = location.pathname.includes(path);
            const isOpen =
              path === "/clientes"
                ? openClientsItemMenu
                : openEmployeesItemMenu;

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
                      if (subItems) {
                        if (path === "/clientes") {
                          handleClientsList();
                        } else if (path === "/colaboradores") {
                          handleEmployeesList();
                        }
                        setOpenSidebar(true);
                      } else {
                        navigate(`${path}`);
                      }
                    }}
                  >
                    {/* Icons */}
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
                    {subItems && openSidebar && returnedIcon(isOpen)}
                  </ListItemButton>
                </ListItem>

                {/* Collapse */}
                {subItems && (
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {subItems.map((subItem) => (
                        <ListItem
                          key={subItem.text}
                          sx={{
                            backgroundColor: location.pathname.includes(
                              subItem.path
                            )
                              ? "#0076BE"
                              : "#EBF4FA",
                          }}
                        >
                          <Link
                            underline="none"
                            sx={{ pl: 4, cursor: "pointer" }}
                            onClick={() => {
                              navigate(subItem.path);
                              if (subItem.path.includes("cadastrar")) {
                                history.go(0);
                              }
                            }}
                          >
                            <ListItemText
                              primary={subItem.text}
                              sx={{
                                fontFamily: "Open Sans",
                                fontSize: "1rem",
                                color: location.pathname.includes(subItem.path)
                                  ? "#FFFFFF"
                                  : "#2E3132",
                                fontWeight: 600,
                                lineHeight: "1.625rem",
                              }}
                            />
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </Fragment>
            );
          })}
        </List>

        {/* Logout Button */}

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: openSidebar ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => {
              setIsSigned(false);
              sessionStorage.clear();
              localStorage.clear();
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: openSidebar ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Logout />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
};
