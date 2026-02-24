import {
  Typography,
  IconButton,
  Switch,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";

export default function TopAppBar({ darkMode, setDarkMode, isMobile, setMobileOpen }) {

  const [scrolled, setScrolled] = useState(false);

  /* ===================================================== */
  /* 2️⃣ SCROLL SHADOW EFFECT */
  /* ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return(
    <AppBar
      position="sticky"
      elevation={scrolled ? 4 : 0}
      sx={{
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#fff" : "#000",
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}

        <Typography sx={{ flex: 1 }} fontWeight={700}>
          Crypto Dashboard
        </Typography>

        <Typography mr={1}> {darkMode ? "Light" : "Dark"}</Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </Toolbar>
    </AppBar>
  )
}