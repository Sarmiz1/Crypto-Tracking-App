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
        <MenuItem 
          component={Link} 
          to="/createAccount" 
          onClick={handleMenuClose}
          sx={{
            '&:hover': {
              color: 'black',
              bgcolor: 'primary.light',
              fontWeight: 500
            }
          }} 
        > 
          Create an account 
        </MenuItem> 
        <MenuItem 
          component={Link} 
          to="/login" 
          onClick={handleMenuClose}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '&:hover': {
              color: 'black',
              bgcolor: 'primary.light',
              fontWeight: 500
            }
          }} 
        > 
          Login 
        </MenuItem> 
      </Menu>
    </Box>
  )
}