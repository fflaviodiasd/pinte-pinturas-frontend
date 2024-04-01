import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const ChecklistDrawer = ({ open, onClose }: any) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 250 }}>
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
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
      </div>
    </Drawer>
  );
};
