import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SidebarContent({ collapsed, setCollapsed }) {
  const sidebarLinks = [
    "Market Overview",
    "Spot Market",
    "Derivatives",
    "Bitcoin Treasuries",
    "BNB Treasuries",
    "Home",
  ];

  const [activeLink, setActiveLink] = useState("Market Overview");

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: 'sticky',
        p: 2,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <Button
        onClick={() => setCollapsed(!collapsed)}
        variant="outlined"
        size="small"
        sx={{
          mb: 3,
          alignSelf: collapsed ? "center" : "flex-start",
          minWidth: collapsed ? 48 : "auto",
        }}
      >
        {collapsed ? ">>" : "<< Collapse"}
      </Button>

      <List sx={{ flexGrow: 1 }}>
        {sidebarLinks.map((text) => (
          <ListItemButton
            component={text === "Home" ? Link : "button"}
            to={text === "Home" ? "/" : undefined}
            key={text}
            onClick={() => setActiveLink(text)}
            sx={{
              borderRadius: 2,
              mb: 1,
              justifyContent: collapsed ? "center" : "flex-start",
              backgroundColor:
                activeLink === text ? "action.selected" : "transparent",
              minHeight: 48,
              color: activeLink === text ? "primary.main" : "text.primary",
            }}
          >
            {!collapsed && <ListItemText primary={text} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}