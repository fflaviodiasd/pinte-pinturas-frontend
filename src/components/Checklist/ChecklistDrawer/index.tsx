import {
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const handleClose = () => {
  alert("close");
};

const handleCopy = () => {
  alert("copy");
};

export const ChecklistDrawer = ({ open, onClose }: any) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 250 }}>
        <div style={{ margin: "1rem" }}>
          <span
            style={{
              fontFamily: "Open Sans",
              fontWeight: 600,
              fontSize: "1.125rem",
            }}
          >
            Copiar Checklists
          </span>
        </div>
        <List>
          <ListItem>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Item 2" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Item 3" />
          </ListItem>
        </List>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose}>
            <Typography style={{ textTransform: "capitalize" }}>
              Cancelar
            </Typography>
          </Button>
          <Button onClick={handleCopy} variant="contained">
            <Typography style={{ textTransform: "capitalize" }}>
              Copiar
            </Typography>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
