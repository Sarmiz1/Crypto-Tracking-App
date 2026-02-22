import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";



export default function MobileDrawer({toggleDrawer, open}) {
  return(
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{
        sx: {
          width: "100%",
          height: "100vh",
          bgcolor: "primary.light",
        },
      }}
    >
      {/* Close Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <IconButton 
          onClick={toggleDrawer(false)}
          sx={{
            color:"red",
            '&:hover': {
              bgcolor: 'rgba(255, 0, 0, 0.3)',
              color: 'white'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Menu Items */}
      <List>
        <ListItem
          component={Link}
          to="/"
          onClick={toggleDrawer(false)}
          sx={{
            textAlign: "center",
            '&:hover': {
              color: '#878787',
            } 
          }}
        >
          <ListItemText 
            primary="Home"
            primaryTypographyProps={{fontWeight: 500}} 
          />
        </ListItem>

        <ListItem
          component={Link}
          to="/dashboard"
          onClick={toggleDrawer(false)}
          sx={{ 
            textAlign: "center",
            '&:hover': {
              color: '#878787',
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
          onClick={toggleDrawer(false)}
          sx={{ 
            textAlign: "center" ,
            '&:hover': {
              color: '#878787',
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
          onClick={toggleDrawer(false)}
          sx={{ 
            textAlign: "center" ,
            '&:hover': {
              color: '#878787',
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
          onClick={toggleDrawer(false)}
          sx={{ 
            textAlign: "center",
            '&:hover': {
              color: '#878787',
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
          onClick={toggleDrawer(false)}
          sx={{ 
            textAlign: "center",
            '&:hover': {
              color: '#878787',
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
            display: 'flex',          
            flexDirection: 'column',  
            justifyContent: 'center', 
            height: '60%',           
            gap: 2,
            p: 1,
            width: '96%'
          }}
        >
          <ListItem
            component={Link}
            to="/createAccount"
            onClick={toggleDrawer(false)}
            sx={{ 
              textAlign: "center",
              bgcolor: 'primary.main',
              borderRadius: 2,
              mx: 2,      
              color: 'white',
              fontWeight: 700,
              '&:hover': {
                bgcolor: 'primary.dark',
                outline: 2,
                outlineColor: 'purple'
              }
            }}
          >
            <ListItemText 
              primary="Create an account" 
              primaryTypographyProps={{fontWeight: 600}} 
            />
          </ListItem>

          <ListItem
            component={Link}
            to="/logIn"
            onClick={toggleDrawer(false)}
            sx={{ 
              textAlign: "center",
              bgcolor: 'primary.main',
              borderRadius: 2,
              mx: 2,
              color: 'white',
              fontWeight: 700,
              '&:hover': {
                bgcolor: 'primary.dark',
                outline: 2,
                outlineColor: 'purple'
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
    </Drawer>
  )
}