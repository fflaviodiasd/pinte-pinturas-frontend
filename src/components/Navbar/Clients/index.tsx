import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { BackgroundAvatar } from "../../Avatar";

export function NavbarClients() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFF" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <BackgroundAvatar />

            <Typography
              sx={{
                color: "#2E3132",
                fontWeight: "bold",
                lineHeight: "2.25rem",
                fontSize: "1.625rem",
              }}
            >
              Smile Company
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
