import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";


export default function DesktopNav() {
  
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "DexScan", path: "/dexscan" },
    { label: "Exchanges", path: "/exchanges" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Watchlist", path: "/watchlist" },
    { label: "Log In", path: "/login" },
  ];

  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <List sx={{ display: "flex", gap: {md: 1, lg: 2} }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                cursor: "pointer",
                width: "auto",
                color: isActive ? "orange" : isDark ? "rgb(255,255,255)" : "rgb(0,0,0)",
                fontWeight: isActive ? "700" : "normal",
                "&:hover": {
                  color: isActive ? "rgba(255, 140, 0, 0.9)" : isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                },
                ...(item.label === "Home" && { display: { md: "none", lg: "flex" } }),
                ...(item.label === "Dashboard" && { display: { md: "none", lg: "flex" } }),
                ...(item.label === "Log In" && { display: { md: "none", lg: "flex" } }),
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
