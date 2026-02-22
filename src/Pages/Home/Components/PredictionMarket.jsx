import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import MarketCard from "../../../Components/MarketCard";
import CustomTabPanel from "../../../Components/CustomTabPanel";

export default function PredictionMarket({ value }) {
  const isMobile = useMediaQuery("(max-width:900px)");
  const [tab, setTab] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const categories = ["all", "crypto", "politics", "economy", "sports"];

  const markets = [
    {
      title: "Bitcoin above $100k in 2026?",
      category: "crypto",
      days: "210d",
      totalVol: "$892.11M",
      dayVol: "$42.8M",
      options: [
        { name: "Yes", value: 58.4 },
        { name: "No", value: 41.6 }
      ]
    },
    {
      title: "Ethereum ETF approved?",
      category: "crypto",
      days: "97d",
      totalVol: "$402.8M",
      dayVol: "$18.9M",
      options: [
        { name: "Approved", value: 63.9 },
        { name: "Rejected", value: 36.1 }
      ]
    },
    {
      title: "Next US President (2028)",
      category: "politics",
      days: "540d",
      totalVol: "$1.2B",
      dayVol: "$23.7M",
      options: [
        { name: "Democrat", value: 51.2 },
        { name: "Republican", value: 44.7 }
      ]
    },
    {
      title: "US recession in 2026?",
      category: "economy",
      days: "189d",
      totalVol: "$289.44M",
      dayVol: "$9.8M",
      options: [
        { name: "Yes", value: 47.3 },
        { name: "No", value: 52.7 }
      ]
    },
    {
      title: "2026 World Cup Winner",
      category: "sports",
      days: "148d",
      totalVol: "$171.22M",
      dayVol: "$5.52M",
      options: [
        { name: "Spain", value: 16.1 },
        { name: "England", value: 13.3 },
        { name: "Argentina", value: 11.8 }
      ]
    }
  ];

  const filteredMarkets =
    categories[tab] === "all"
      ? markets
      : markets.filter(
          (market) => market.category === categories[tab]
        );

  return (
    <CustomTabPanel value={value} index={3}>
      <Box sx={{ p: 3 }}>
        {/* Top Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3
          }}
        >
          {isMobile && (
            <IconButton onClick={() => setOpenDrawer(true)}>
              <MenuIcon sx={{ color: isDark ? "#fff" : "#000" }} />
            </IconButton>
          )}

          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            textColor="inherit"
            indicatorColor="primary"
            variant={isMobile ? "scrollable" : "standard"}
          >
            <Tab label="All" />
            <Tab label="Crypto" />
            <Tab label="Politics" />
            <Tab label="Economy" />
            <Tab label="Sports" />
          </Tabs>
        </Box>

        {/* Drawer (Mobile Sidebar) */}
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

        {/* Market Grid */}
        <Grid container spacing={3}>
          {filteredMarkets.map((market, index) => (
            <Grid item xs={12} md={6} key={index}>
              <MarketCard {...market} isDark={isDark} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </CustomTabPanel>
  );
}
