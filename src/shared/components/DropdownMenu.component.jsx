import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";

export const DropdownMenuComponent = ({ items, onClick }) => {
  const [selected, setSelected] = useState(items[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ gap: 1, bgcolor: "gray", borderRadius: 2 }}>
      <Button
        sx={{ gap: 1, color: "white", width: "100%" }}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {selected.name}
      </Button>
      <Menu
        id="basic-menu"
        sx={{ gap: 1 }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {items.map((item) => (
          <MenuItem
            key={item.name}
            sx={{
              gap: 1,
            }}
            onClick={() => {
              setSelected(item);
              onClick(item);
              handleClose();
            }}
          >
            <Typography
              sx={{
                color: selected.name === item.name ? "blue" : "gray",
              }}
            >
              {item.icon ?? null}
              {item.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
