import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CustomTextBox from "../../../Components/CustomTextBox";
import { textFile } from "../../../Data/text";

function ChangeIndicator({ value }) {
  const isPositive = value >= 0;

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        color: isPositive ? "#16c784" : "#ea3943", // Coin-style colors
        fontWeight: 600
      }}
    >
      {isPositive ? (
        <ArrowDropUpIcon fontSize="small" />
      ) : (
        <ArrowDropDownIcon fontSize="small" />
      )}
      {Math.abs(value)}%
    </Box>
  );
}

export default function InfoSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [expanded, setExpanded] = useState(false);

  const textColor = isDark ? "#fff" : "#000";

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: isDark ? "#343231" : "#FAF9F6",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 4
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: textColor }}
        >
          Today's Cryptocurrency Prices by Market Cap
        </Typography>

        <Typography sx={{ color: textColor }}>
          The global crypto market cap is $2.34T,{" "}
          <ChangeIndicator value={0.58} /> increase over the last day.
        </Typography>

        <Collapse in={expanded}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ color: textColor }}>
              The total crypto market volume over the last 24 hours is $54.44B,{" "}
              <ChangeIndicator value={-47.19} /> decrease.
            </Typography>

            <Typography sx={{ color: textColor }}>
              The total volume in DeFi is currently $6.18B, 11.35% of total volume.
            </Typography>

            <Typography sx={{ color: textColor }}>
              The volume of all stable coins is now $54B, 99.18% of total volume.
            </Typography>

            <Typography sx={{ color: textColor }}>
              Bitcoin’s dominance is currently 58.34%,{" "}
              <ChangeIndicator value={0.17} /> over the day.
            </Typography>
          </Box>
        </Collapse>

        {/* Toggle */}
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
              color: textColor
            }}
          >
            {expanded ? "Read Less" : "Read More"}
          </Typography>
        </Box>
      </Box>

      <CustomTextBox text={textFile} />
    </Box>
  );
}