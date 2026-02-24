import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
export default function FooterColumn({ title, links, textColor, subTextColor }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      
      {/* Column Title */}
      <Typography
        sx={{
          fontWeight: 600,
          color: textColor,
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {/* Links */}
      {links.map((link, index) => (
        <Typography
          key={index}
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            fontSize: 14,
            color: subTextColor,
            transition: "0.2s",
            "&:hover": {
              color: textColor,
            },
          }}
        >
          {link}
        </Typography>
      ))}
    </Box>
  );
}