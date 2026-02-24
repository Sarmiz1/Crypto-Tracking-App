import { Box, Button } from "@mui/material";

export default function AppsButton({ isDark }) {
  const buttonImg = [
    { label: "playstore", src: {light: "/playstore1.png", dark: "/playstore2.png"} },
    { label: "appstore", src: {light: "/appstore1.png", dark: "/appstore2.png"} },
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
              scale: "1.05",
            },
            "&:active": {
              backgroundColor: "transparent",
            },
            transition: "all transform 0.3s ease",
          }}
        >
          <Box
            component="img"
            src={isDark ? button.src.light : button.src.dark}
            alt={button.label}
            sx={{
              display: "block",
              width: { xs: 120, sm: 140, md: 150 },
              cursor: "pointer",
            }}
          />
        </Button>
      ))}
    </Box>
  );
}