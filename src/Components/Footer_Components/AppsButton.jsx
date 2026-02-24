import { Box,  Button } from "@mui/material";


export default function AppsButton({ subTextColor, textColor }) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          color: textColor,
          borderColor: subTextColor,
        }}
      >
        App Store
      </Button>

      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          color: textColor,
          borderColor: subTextColor,
        }}
      >
        Google Play
      </Button>
    </Box>
  );
}
