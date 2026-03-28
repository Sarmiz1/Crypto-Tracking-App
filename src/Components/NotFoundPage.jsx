// src/Pages/NotFoundPage.jsx
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage({ mode }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 2,
        gap: 3,
        // Dynamic background
        backgroundColor:
          mode === "dark"
            ? "rgba(18,18,18,0.95)"
            : "rgba(245,245,245,0.95)",

        color: mode === "dark" ? "#fff" : "#111",
      }}
    >
      <Box
        component="img"
        src="/notFound/notfound-removebg-preview.png"
        alt="Page not found"
        sx={{
          width: { xs: 120, sm: 150, md: 200 }, // responsive width
          borderRadius: 2, // rounded corners
          boxShadow: 3, // MUI shadow
        }}
      />

      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontSize: { xs: 25, sm: 27, md: 30, lg: 40 }
        }}
      >
        404 - Page Not Found
      </Typography>

      <Typography
        variant="body1"
        gutterBottom
        sx={{
          fontSize: { xs: 15, sm: 17, md: 20 }
        }}
      >
        The page you are looking for does not exist.
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{ mt: 2 }}
      >
        Go Home
      </Button>
    </Box>
  );
}