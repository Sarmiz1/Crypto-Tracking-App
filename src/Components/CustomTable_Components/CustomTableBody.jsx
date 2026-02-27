import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Stack,
  Box,
  IconButton
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

export default function CustomTableBody({ coins, stickyBg, currency }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  
  return (
    <TableBody>
      {coins.map((coin) => {
        const isPositive = coin.price_change_percentage_24h >= 0;
        const chartData = (coin.chart || []).map((price, idx) => ({
          time: idx,   // X-axis: index of price in sparkline array
          value: price
        }));

        return (
          <TableRow
            key={coin.id}
            hover
            sx={{
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.04)"
              }
            }}
          >
            {/* Sticky Rank */}
            <TableCell
              sx={{
                position: "sticky",
                left: 0,
                backgroundColor: stickyBg,
                zIndex: 4,
                width: 80,
                boxShadow: "2px 0 5px rgba(0,0,0,0.05)"
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton size="small">
                  <StarBorderIcon fontSize="small" />
                </IconButton>
                {coin.market_cap_rank}
              </Stack>
            </TableCell>

            {/* Sticky Name */}
            <TableCell
              sx={{
                position: "sticky",
                left: 80,
                backgroundColor: stickyBg,
                zIndex: 4,
                width: 220,
                boxShadow: "2px 0 5px rgba(0,0,0,0.03)"
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box component={'img'}
                  alt={`${coin.name} logo`}
                  src={coin.image}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "transparent"
                  }}
                />
                <Box>
                  <Typography>{coin.name}</Typography>
                </Box>
              </Stack>
            </TableCell>

            <TableCell align="right">{currency.symbol}{coin.current_price}</TableCell>

            <TableCell
              align="right"
              sx={{ color: isPositive ? "success.main" : "error.main" }}
            >
              {isPositive ? "+" : ""}
              {coin.price_change_percentage_24h?.toFixed(2)}%
            </TableCell>

            <TableCell align="right">{coin.market_cap}</TableCell>

            <TableCell align="right">{coin.total_volume}</TableCell>

            <TableCell align="right">{coin.total_supply}</TableCell>

            {/* Sparkline chart */}
            <TableCell align="right">
              <Box sx={{ height: 50, width: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="time" hide />
                    <YAxis hide domain={["dataMin", "dataMax"]} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={isPositive ? "#00c853" : "#d32f2f"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}