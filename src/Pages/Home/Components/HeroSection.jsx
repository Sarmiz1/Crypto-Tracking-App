import { Box, Typography, Button, Container } from "@mui/material";
import { keyframes } from "@mui/system";

const float = keyframes`
  0% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-10px) scale(1.02); }
  100% { transform: translateY(0px) scale(1); }
`;

const pulse = keyframes`
  0% { opacity: 0.35; }
  50% { opacity: 0.6; }
  100% { opacity: 0.35; }
`;

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "400px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        background: `linear-gradient(135deg, 
          #6A1B9A 0%, 
          #E91E63 25%, 
          #3BA3C9 50%, 
          #F45D22 75%, 
          #F6B23C 100%
        )`,
      }}
    >
      {/* Animated Infinity */}
      <Box
        component="svg"
        viewBox="0 0 500 250"
        sx={{
          position: "absolute",
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%",
          zIndex: 0,
          animation: `${float} 6s ease-in-out infinite`,
        }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M100,125 C100,50 200,50 250,125 
            C300,200 400,200 400,125
            C400,50 300,50 250,125
            C200,200 100,200 100,125"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="45"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{
            animation: `${pulse} 4s ease-in-out infinite`,
          }}
        />
      </Box>

      {/* Foreground Content */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h3" color="blue" fontWeight={700}>
          CoinVerse
        </Typography>
        <Typography variant="h6" color="blue.100" sx={{ mt: 2 }}>
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
    </Box>
  );
}