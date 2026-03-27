import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function DrawerForMobile({ openDrawer, setOpenDrawer, setTab, categories }) {
  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Categories
        </Typography>
        <List>
          {categories.map((cat, index) => (
            <ListItem
              button
              key={cat}
              onClick={() => {
                setTab(index);
                setOpenDrawer(false);
              }}
            >
              <ListItemText primary={cat.toUpperCase()} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
