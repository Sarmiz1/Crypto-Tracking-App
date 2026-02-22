import {
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";




export default function DesktopNavLinks() {

  return(
    <List sx={{
      display: {
        xs: 'none',
        md: 'flex'
      },
      ml: 4
    }}>

      <ListItem
        component={Link}
        to="/dashboard"
        sx={{ 
          textAlign: "center",
          '&:hover': {
            opacity: 0.8
          } 
        }}
      >
        <ListItemText 
          primary="Dashboard" 
          primaryTypographyProps={{fontWeight: 500}} 
        />
      </ListItem>

      <ListItem
        component={Link}
        to="/dexscan"
        sx={{ 
          textAlign: "center" ,
          '&:hover': {
            opacity: 0.8
          }  
        }}
      >
        <ListItemText 
          primary="DexScan" 
          primaryTypographyProps={{fontWeight: 500}} 
        />
      </ListItem>

      <ListItem
        component={Link}
        to="/exchanges"
        sx={{ 
          textAlign: "center" ,
          '&:hover': {
            opacity: 0.8
          }
        }}
      >
        <ListItemText 
        primary="Exchanges" 
        primaryTypographyProps={{fontWeight: 500}} 
        />
      </ListItem>


      <ListItem
        component={Link}
        to="/portfolio"
        sx={{ 
          textAlign: "center",
          '&:hover': {
            opacity: 0.8
          }
        }}
      >
        <ListItemText 
          primary="Portfolio" 
          primaryTypographyProps={{fontWeight: 500}} 
        />
      </ListItem>

      <ListItem
        component={Link}
        to="/watchlist"
        sx={{ 
          textAlign: "center",
          '&:hover': {
            opacity: 0.8
          }
        }}
      >
        <ListItemText 
          primary="Watchlist"
          primaryTypographyProps={{fontWeight: 500}} 
        />
      </ListItem>

      <Box
        sx={{
          display: {
            md: 'none',
            lg: 'flex'
          },
          ml: 2,
          gap: 3,                
        }}
      >

        <ListItem
          component={Link}
          to="/create-account"
          sx={{ 
            textAlign: "center",
            bgcolor: '#6C3BAA',
            borderRadius: 2,
            color: 'white',
            fontWeight: 700,
            '&:hover': {
              bgcolor: '#9932CC',
              outline: 2,
              borderColor: 'purple',
              color: 'rgba(255, 255, 255, 0.8)'
            }
          }}
        >
          <ListItemText 
            primary="Sign up"
            primaryTypographyProps={{fontWeight: 600}}  
          />
        </ListItem>

        <ListItem
          component={Link}
          to="/logIn"
          sx={{ 
            textAlign: "center",
            bgcolor: 'primary.main',
            borderRadius: 2,
            color: 'white',
            fontWeight: 700,
            '&:hover': {
              bgcolor: 'primary.dark',
              outline: 2,
              borderColor: 'purple',
              color: 'rgba(255, 255, 255, 0.8)'
            }
          }}
        >
          <ListItemText 
            primary="Log in"
            primaryTypographyProps={{fontWeight: 600}}  
          />
        </ListItem>
      </Box>
    </List>
  )
}