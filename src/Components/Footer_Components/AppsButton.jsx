import { Box, Button } from "@mui/material";

export default function AppsButton({ isDark }) {
  const buttonImg = [
    {
      label: "playstore",
      src: {
        light: "/playstore_white.png",   // visible on light background
        dark: "/playstore_black.png",     // visible on dark background
      },
    },
    {
      label: "appstore",
      src: {
        light: "/appstore_white.svg",    // white on light bg? usually black on light
        dark: "/appstore_black.svg",      // dark/white version for dark mode
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {buttonImg.map((button) => (
        <Button
          key={button.label}
          disableRipple
          disableElevation
          sx={{
            p: 0,
            minWidth: "auto",
            backgroundColor: "transparent",
            "&:hover": {
              transform: "scale(1.05)", // use transform instead of scale for better support
            },
            "&:active": {
              backgroundColor: "transparent",
            },
            transition: "transform 0.3s ease",
          }}
        >
          <Box
            component="img"
            src={isDark ? button.src.light : button.src.dark} // ← FIXED: dark mode → dark image
            alt={button.label}
            sx={{
              display: "block",
              width: { xs: 120, sm: 140, md: 150 },
              cursor: "pointer",
              // Optional: force good SVG rendering
              imageRendering: "crisp-edges",
            }}
            loading="lazy"
          />
        </Button>
      ))}
    </Box>
  );
}