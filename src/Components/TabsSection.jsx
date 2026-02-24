import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from "@mui/material/styles";



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function TabsSection({ value, handleChange }) {

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  

  return(
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3}}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="homepage scroll tabs"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{
                minHeight: "auto",

                "& .MuiTab-root": {
                color: isDark ?
                      '#FFFFFF' :
                      "rgba(0,0,0,0.6)", // inactive
                fontWeight: 500,
                transition: "all 0.2s ease",
                textTransform: "none",
                minHeight: "auto",
                borderRadius: "999px",
                px: 3,

                "&:hover": {
                  opacity: 0.5,
                  backgroundColor: "rgba(0,0,0,0.05)",
                  borderRadius: 2,
                },
              },
              "& .Mui-selected": {
                color: "#1976d2",
                fontWeight: 700,
                transform: "scale(1.05)",
              },
              "& .MuiTabs-indicator": {
                background: "linear-gradient(90deg, #E91E63, #F6B23C)",
                height: 4,
                borderRadius: 2,
                transition: "all 0.2s cubic-bezier(0.65, 0, 0.35, 1)", //smooth animation
              },
            }}
        >
          <Tab label="Top" {...a11yProps(0)}  disableRipple sx={{fontSize:20}} />
          <Tab label="Trending" {...a11yProps(1)}  disableRipple sx={{fontSize:20}}/>
          <Tab label="Watchlist" {...a11yProps(2)}  disableRipple sx={{fontSize:20}}/>
          <Tab label="Prediction Markets" {...a11yProps(3)} disableRipple sx={{fontSize:20}}/>
          <Tab label="Most Visited" {...a11yProps(4)} disableRipple sx={{fontSize:20}}/>
          <Tab label="New" {...a11yProps(5)}  disableRipple sx={{fontSize:20}}/>
        </Tabs>
      </Box>
    </>
  )
}
