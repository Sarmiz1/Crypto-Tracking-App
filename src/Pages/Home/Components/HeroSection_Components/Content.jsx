import { Typography, Button, Container } from "@mui/material";

export default function Content() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        zIndex: 1,
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      <Typography variant="h3" color="blue" fontWeight={700}>
        CoinVerse
      </Typography>
      <Typography variant="h6" color="black" sx={{ mt: 2, fontWeight: 500 }}>
        Track crypto markets in real-time.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "black",
          "&:hover": { backgroundColor: "#111" },
        }}
      >
        Get Started
      </Button>
    </Container>
  );
}
