import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logoPng from "../../assets/crypto_logo.png";

export default function Logo() {

  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
        ml: -1,
        mr: 1,
        transition: "opacity 0.3s ease",
        '&:hover': {
          opacity: 0.8
        }
      }}
    >

      <Box
        component="img"
        src={logoPng}
        alt="logo"
        sx={{ 
          height: 40, 
          mr: 1 ,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        CoinVerse
      </Typography>
    </Box>
  )
} 