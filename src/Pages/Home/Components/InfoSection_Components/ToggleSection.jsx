import { Box, Typography, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export default function ToggleSection({ textColor, setExpanded, expanded }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        onClick={() => setExpanded(!expanded)}
        size="small"
        sx={{ color: textColor }}
      >
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>

      <Typography
        onClick={() => setExpanded(!expanded)}
        sx={{
          cursor: "pointer",
          fontWeight: 500,
          color: textColor,
        }}
      >
        {expanded ? "Read Less" : "Read More"}
      </Typography>
    </Box>
  );
}
