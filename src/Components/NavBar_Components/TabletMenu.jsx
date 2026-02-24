import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";


export default function TabletMenu() {

  const [anchorEl, setAnchorEl] = useState(null);


  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
  setAnchorEl(null);
  };


  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Create an account", path: "/createAccount"},
    { label: "Log in", path: "/login" },
  ];

  return (
    <Box sx={{ display: { 
      xs: 'none', 
      md: "flex", 
      lg: "none" }}}
    > 
      <IconButton 
        onClick={handleMenuClick}
        sx={{
          color: 'white'
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)} 
        onClose={handleMenuClose} 
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} 
        transformOrigin={{ vertical: "top", horizontal: "right" }} 
        PaperProps={{
          sx: {
            bgcolor: 'primary.main',
            color: 'white',
            mt: 2,
          }
        }}
      > 
        {menuItems.map((item) => ( 
          <MenuItem 
            key={item.path}
            component={Link} 
            to={item.path} 
            onClick={handleMenuClose}
            sx={{
              '&:hover': {
                color: 'black',
                bgcolor: 'orange',
                fontWeight: 500
              },
              justifyContent: 'center'
            }} 
          > 
            {item.label}
          </MenuItem> 
        ))}
      </Menu>
    </Box>
  )
}