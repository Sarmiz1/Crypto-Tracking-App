import {
  Typography,
  IconButton,
  Switch,
  AppBar,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";

export default function TopAppBar({ mode, setMode, isMobile, setMobileOpen }) {

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

  const handleSwitchChange = () => {
    setMode(mode === "dark" ? "light" : "dark");
  }


  return(
    <AppBar
      position="sticky"
      elevation={scrolled ? 4 : 0}
      sx={{
        backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
        color: mode === "dark" ? "#fff" : "#000",
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

        <Typography mr={1}> {mode === "dark" ? "Light" : "Dark"}</Typography>
        <Switch
          checked={mode}
          onChange={handleSwitchChange}
        />
      </Toolbar>
    </AppBar>
  )
}