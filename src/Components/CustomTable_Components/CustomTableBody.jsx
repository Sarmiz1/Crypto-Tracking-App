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
  ResponsiveContainer
} from "recharts";

export default function CustomTableBody({ coins, stickyBg }) {

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <TableBody>
      {coins.map((coin) => {
        const isPositive = coin.change24h >= 0;

        return (
          <TableRow
            key={coin.rank}
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
                {coin.rank}
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
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "#f7931a"
                  }}
                />
                <Box>
                  <Typography>{coin.name}</Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {coin.symbol}
                  </Typography>
                </Box>
              </Stack>
            </TableCell>

            <TableCell align="right">
              ${coin.price.toLocaleString()}
            </TableCell>

            <TableCell
              align="right"
              sx={{
                color: isPositive
                  ? "success.main"
                  : "error.main"
              }}
            >
              {isPositive ? "+" : ""}
              {coin.change24h}%
            </TableCell>

            <TableCell align="right">
              {coin.marketCap}
            </TableCell>

            <TableCell align="right">
              {coin.volume}
            </TableCell>

            <TableCell align="right">
              {coin.supply}
            </TableCell>

            <TableCell align="right">
              <Box sx={{ height: 50, width: 120 }}>
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <LineChart
                    data={coin.chart.map((v) => ({
                      value: v
                    }))}
                  >
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={
                        isPositive
                          ? "#00c853"
                          : "#d32f2f"
                      }
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
  )
}