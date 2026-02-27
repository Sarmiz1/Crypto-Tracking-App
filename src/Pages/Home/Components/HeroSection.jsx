import  Box from "@mui/material/Box";
import AnimatedInfinity from "./HeroSection_Components/AnimatedInfinity";
import Content from "./HeroSection_Components/Content";

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
      <AnimatedInfinity />

      {/* Foreground Content */}
      <Content />
    </Box>
  );
}