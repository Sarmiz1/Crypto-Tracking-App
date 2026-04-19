// src/Pages/FallbackPage.jsx
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useContext } from "react";
import { appContext } from "../Context/AppContext";

const FallbackPage = (props) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/", { replace: true }); // avoid going back to error page
    if (props.resetErrorBoundary) props.resetErrorBoundary(); // reset error boundary if provided
  };

  const { mode } = useContext(appContext) 

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        px: 2,
        textAlign: "center",

         // Dynamic background
        backgroundColor:
          mode === "dark"
            ? "rgba(18,18,18,0.95)"
            : "rgba(245,245,245,0.95)",

        color: mode === "dark" ? "#fff" : "#111",
      }}
    >
      {/* Error Image */}
      <Box
        component="img"
        src="/error/error-removebg-preview.png"
        alt="Something went wrong"
        sx={{
          width: { xs: 120, sm: 150, md: 200 }, // responsive width
          borderRadius: 2, // rounded corners
          boxShadow: 3, // MUI shadow
        }}
      />

      {/* Error message */}
      <Typography
        variant="body1"
        sx={{
          maxWidth: { xs: 400, md: 500 }, 
          fontWeight: 600,
          color: "text.primary",
          lineHeight: 1.6,
          fontSize: { xs: 15, sm: 17, md: 20 }
        }}
      >
        Something went wrong. Try clicking the refresh page button to reload
        the application or go back to homepage.
      </Typography>

      {/* Action buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: 'row',
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          color="warning"
          onClick={props.resetErrorBoundary}
          sx={{ width: 140, borderRadius: 3 }}
        >
          Refresh page
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={handleGoHome}
          sx={{ width: 140, borderRadius: 3 }}
        >
          Go home
        </Button>
      </Box>
    </Box>
  );
};

export default FallbackPage;