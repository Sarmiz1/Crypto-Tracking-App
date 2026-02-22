import { useState } from "react";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CustomTextBox({ text }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [expanded, setExpanded] = useState(false);

  const textColor = isDark ? "#fff" : "#000";

  return (
    <Box sx={{ my: 2 }}>
      {/* Always Visible Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography
          variant={text.size}
          sx={{
            fontWeight: 400,
            color: textColor,
            fontSize: 13,
          }}
        >
          {text.visible}
        </Typography>

        {/* Inline Toggle */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => setExpanded(!expanded)}
            size="small"
            sx={{
              color: textColor,
              transition: "0.3s",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ExpandMoreIcon />
          </IconButton>

          <Typography
            onClick={() => setExpanded(!expanded)}
            sx={{
              cursor: "pointer",
              fontSize: 12,
              color: textColor,
            }}
          >
            {expanded ? "Read Less" : "Read More"}
          </Typography>
        </Box>
      </Box>

      {/* Animated Expand Section */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {text.mainContent.map((content) => (
            <Box
              key={content.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: textColor,
                  fontWeight: 600,
                }}
              >
                {content.head}
              </Typography>

              <Typography
                sx={{
                  color: textColor,
                  maxWidth: "100ch",
                  fontSize: 13,
                }}
              >
                {content.content}
              </Typography>
            </Box>
          ))}

          {expanded && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => setExpanded(!expanded)}
                size="small"
                sx={{
                  color: textColor,
                  transition: "0.3s",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <ExpandMoreIcon />
              </IconButton>

              <Typography
                onClick={() => setExpanded(!expanded)}
                sx={{
                  cursor: "pointer",
                  fontSize: 15,
                  color: textColor,
                  fontWeight: 700,
                  textDecoration: 'underline'
                }}
              >
                {expanded ? "Read Less" : "Read More"}
              </Typography>
            </Box>
          )}
        </Box>
      </Collapse>
    </Box>
  );
}
