import { 
  Box, 
  Grid, 
  Select, 
  MenuItem, 
} from "@mui/material";
import Logo from "../Logo";

export default function LeftSideGrid({ isDark, textColor }) {
  return (
    <Grid item xs={12} md={3}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Logo */}
        <Logo />

        {/* Language Select */}
        <Select
          defaultValue="USD"
          size="small"
          sx={{
            width: 180,
            bgcolor: isDark ? "#2A2A2A" : "#fff",
            color: textColor,
          }}
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="NGN">NGN</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </Select>
      </Box>
    </Grid>
  );
}
