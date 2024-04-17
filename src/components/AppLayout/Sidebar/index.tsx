import { useState, ReactElement, Fragment, useEffect } from "react";
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
import { ExpandLess, ExpandMore, Menu } from "@mui/icons-material";

import { KEY_SIDEBAR } from "../../../utils/consts";

import { LogoutButton } from "./LogoutButton";

import { Drawer, DrawerHeader } from "./styles";

import ConstructionsIcon from "../../../assets/images/constructions.svg";
import EmployeesIcon from "../../../assets/images/employees.svg";
import MaterialsIcon from "../../../assets/images/materials.svg";
import ClientsIcon from "../../../assets/images/clients.svg";
import logoImage from "../../../assets/images/logo.png";

interface NavItem {
  text: string;
  path: string;
  icon?: ReactElement;
  subItems?: NavItem[];
}

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSideBarOpen = () => {
    const storageIsSideBarOpen = localStorage.getItem(KEY_SIDEBAR);
    if (storageIsSideBarOpen) {
      return Boolean(JSON.parse(storageIsSideBarOpen));
    }
    return false;
  };

  const [openSidebar, setOpenSidebar] = useState(isSideBarOpen());
  const [openClientsItemMenu, setOpenClientsItemMenu] = useState(false);
  const [openEmployeesItemMenu, setOpenEmployeesItemMenu] = useState(false);

  const handleDrawer = () => {
    setOpenSidebar(!openSidebar);
    localStorage.setItem(KEY_SIDEBAR, String(!openSidebar));
    if (openSidebar) {
      setOpenClientsItemMenu(false);
      setOpenEmployeesItemMenu(false);
    }
  };

  const handleClientsList = () => {
    setOpenClientsItemMenu(!openClientsItemMenu);
    // setOpenEmployeesItemMenu(false);
  };

  const handleEmployeesList = () => {
    setOpenEmployeesItemMenu(!openEmployeesItemMenu);
    // setOpenClientsItemMenu(false);
  };

  useEffect(() => {
    console.log("openClientsItemMenu", openClientsItemMenu);
    console.log("openEmployeesItemMenu", openEmployeesItemMenu);
  }, [openClientsItemMenu, openEmployeesItemMenu]);

  const navItems: NavItem[] = [
    {
      text: "Clientes",
      path: "clientes",
      icon: <img src={ClientsIcon} alt="Clientes" />,
      subItems: [
        { text: "• Cadastro", path: "/clientes/cadastrar" },
        { text: "• Listagem", path: "/clientes/listagem" },
      ],
    },
    {
      text: "Funcionários",
      path: "colaboradores",
      icon: <img src={EmployeesIcon} alt="Funcionários" />,
      subItems: [
        { text: "• Cadastro", path: "/colaboradores/cadastrar" },
        { text: "• Listagem", path: "/colaboradores/listagem" },
      ],
    },
    {
      text: "Obras",
      path: "obras",
      icon: <img src={ConstructionsIcon} alt="Obras" />,
    },
    {
      text: "Materiais",
      path: "materiais",
      icon: <img src={MaterialsIcon} alt="Materiais" />,
    },
  ];

  const returnedIcon = (isOpen: boolean) => {
    if (isOpen) {
      return <ExpandLess />;
    }
    return <ExpandMore />;
  };

  const verifyPathname = (pathname: string) => {
    if (location.pathname) {
      return location.pathname
        .split("/")
        .filter((item) => {
          if (item) {
            return item;
          }
        })[0]
        ?.includes(pathname);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={openSidebar}>
        {/* Container Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: 80,
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
              style={{ height: 45, width: 45, cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
            <div
              style={{
                display: openSidebar ? "flex" : "none",
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <List>
            {navItems.map((navItem) => {
              const { path, subItems } = navItem;

              const isActive = verifyPathname(path);

              const isOpen =
                path === "clientes"
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
                        if (path === "clientes") {
                          handleClientsList();
                          setOpenSidebar(true);
                        } else if (path === "colaboradores") {
                          handleEmployeesList();
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
                              onClick={() => navigate(subItem.path)}
                            >
                              <ListItemText
                                primary={subItem.text}
                                sx={{
                                  fontFamily: "Open Sans",
                                  fontSize: "1rem",
                                  color: location.pathname.includes(
                                    subItem.path
                                  )
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

          <LogoutButton />
        </div>
      </Drawer>
    </Box>
  );
};
