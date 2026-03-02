import { Box, List, ListItemButton, ListItemText, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function SidebarContent({ 
  collapsed, 
  setCollapsed, 
  setTab,
  activeLink, 
  setActiveLink,
  setMobileOpen
  }) {
  const sidebarLinks = [
    "Market Overview",
    "Spot Market",
    "Derivatives",
    "Bitcoin Treasuries",
    "BNB Treasuries",
    "Home",
  ];


  const handleClickAction = (text) => {
    setActiveLink(text);
    setMobileOpen(false)

    switch (text) {
      case "Market Overview":
        setTab(0);
        break;
      case "Spot Market":
        setTab(1);
        break;
      case "Derivatives":
        setTab(2);
        break;
      default:
        ''
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "sticky",
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
            onClick={() => handleClickAction(text)}
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
