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
} from "@mui/material";

import { Business, Badge, ArrowBack, ArrowForward } from "@mui/icons-material";

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

  const handleDrawer = () => {
    setOpenSidebar(!openSidebar);
  };

  const navItems: NavItem[] = [
    { text: "Clientes", path: "/clientes", icon: <Business /> },
    { text: "Funcionários", path: "/colaboradores", icon: <Badge /> },
    { text: "Obras", path: "/obras", icon: <Business /> },
  ];

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
            style={{
              color: "#0076BE",
              border: "1px solid #0076BE",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
            }}
          >
            {openSidebar ? <ArrowForward /> : <ArrowBack />}
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
                      navigate(`${path}`);
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
                  </ListItemButton>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
};
