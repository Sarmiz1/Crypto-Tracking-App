import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

export default function AnimatedInfinity() {
  
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

  return (
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
  );
}
