import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import DesktopNavLinks from "./NavBar_Components/DesktopNavLinks";
import TabletMenu from "./NavBar_Components/TabletMenu";
import SearchBar from "./NavBar_Components/SearchBar";
import MobileDrawer from "./NavBar_Components/MobileDrawer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Switch  from "@mui/material/Switch";

export default function NavBar({ setMode, mode }) {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };
  
  const display = { xs: "none", sm: "block" }

  return (
    <>
      <AppBar position="fixed" sx={{ p: 1 }}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo component={Link} display={display} />
          <DesktopNavLinks />
          <TabletMenu />
          <SearchBar />

          {/* DarkMode */}
          <IconButton onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Fullscreen Mobile Drawer */}
      <MobileDrawer toggleDrawer={toggleDrawer} open={open} />
      {/* Spacer */}
      <Toolbar />
    </>
  );
}
