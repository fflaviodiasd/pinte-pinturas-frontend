import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import {
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

type TableActionProps = {
  params: any;
  editFunction: () => void;
  viewFunction: () => void;
};

export const TableActions = ({
  params,
  editFunction,
  viewFunction,
}: TableActionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={editFunction}>
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="mais opções"
        aria-controls={`menu-item-row-${params.row.id}`}
        aria-haspopup="true"
        onClick={handleMenu}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`menu-item-row-${params.row.id}`}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={viewFunction}>Ver</MenuItem>

        <MenuItem
          onClick={() => {
            setIsModalOpen(true);
            handleClose();
          }}
        >
          Excluir
        </MenuItem>
      </Menu>
    </div>
  );
};
