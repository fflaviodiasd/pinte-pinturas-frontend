import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { BackgroundAvatar } from "../../../Avatar";
import { UserContext } from "../../../../contexts/UserContext";

export function LogoutButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const { user, setIsSigned } = React.useContext(UserContext);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          backgroundColor: menuOpen ? "#DEF4FF" : "transparent",
        }}
      >
        <Tooltip title="Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={menuOpen ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
          >
            <BackgroundAvatar avatarName={user.profileName} showBadge={true} />
          </IconButton>
        </Tooltip>
        <div style={{ margin: "0.5rem" }}>
          <div
            style={{
              color: "#2E3132",
              fontFamily: "Open Sans",
              fontWeight: "600",
              fontSize: "1rem",
            }}
          >
            {user.profileName}
          </div>
          <div
            style={{
              color: "#2E3132",
              fontFamily: "Open Sans",
              fontWeight: "400",
              fontSize: "1rem",
            }}
          >
            {user.type}
          </div>
        </div>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{ color: "#D32F2F" }}
          onClick={() => {
            setIsSigned(false);
            sessionStorage.clear();
            localStorage.clear();
          }}
        >
          <ListItemIcon>
            <Logout sx={{ color: "#D32F2F" }} />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
