import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import currencyFormat from "../../utils/currencyFormat";
import { formatLargeDigits } from "../../utils/formatLargeDigits";
import { useContext } from "react";
import { appContext } from "../../Context/AppContextProvider";

export default function CustomTableBody({ coins, stickyBg, currency, section = "table" }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const {
    watchList: { watchlist, setWatchlist },
  } = useContext(appContext);

  const { symbol: currencySymbol } = currency || {};

  const handleWatchlistToggle = (coin) => {
    if (watchlist.some((c) => c.id === coin.id)) {
      setWatchlist(watchlist.filter((c) => c.id !== coin.id));
    } else {
      setWatchlist([...watchlist, coin]);
    }
  };

  return (
    <TableBody>
      {coins.map((coin, index) => {
        let rankDisplay;
        if (section === "watchlist") rankDisplay = "__";
        else if (section === "top") rankDisplay = coin.market_cap_rank;
        else rankDisplay = index + 1;

        const isWatched = watchlist.some((c) => c.id === coin.id);
        const change = Number(coin.price_change_percentage_24h);
        const isPositive = !isNaN(change) && change >= 0;

        const chartData = (coin.chart || []).map((price, idx) => ({
          time: idx,
          value: price,
        }));

        return (
          <TableRow
            key={coin.id}
            hover
            sx={{
              "&:hover": {
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
              },
            }}
          >
            {/* Sticky Rank */}
            <TableCell
              sx={{
                position: "sticky",
                left: 0,
                backgroundColor: stickyBg,
                zIndex: 4,
                px: 0,
                boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", width: { xs: 55, sm: 56, md: 80 }, overflow: "hidden" }}>
                <IconButton size="small" onClick={() => handleWatchlistToggle(coin)}>
                  {isWatched ? <StarIcon sx={{ color: "#FFD700" }} fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                </IconButton>
                <Typography variant="body2" noWrap>
                  {rankDisplay}
                </Typography>
              </Box>
            </TableCell>

            {/* Sticky Name */}
            <TableCell
              sx={{
                position: "sticky",
                left: { xs: 30, sm: 56, md: 80 },
                backgroundColor: stickyBg,
                zIndex: 4,
                px: 0,
                boxShadow: "2px 0 5px rgba(0,0,0,0.03)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", width: { xs: 100, sm: 160, md: 220 }, overflow: "hidden", gap: 1 }}>
                <Box
                  component="img"
                  alt={`${coin.name} logo`}
                  src={coin.image}
                  sx={{
                    width: { xs: 20, sm: 28, md: 32 },
                    height: { xs: 20, sm: 28, md: 32 },
                    borderRadius: "50%",
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" noWrap>
                  {coin.name}
                </Typography>
              </Box>
            </TableCell>

            <TableCell align="right">{currencyFormat(coin.current_price, { symbol: currencySymbol })}</TableCell>
            <TableCell align="right" sx={{ color: isPositive ? "success.main" : "error.main" }}>
              {isPositive ? "+" : ""}
              {currencyFormat(coin.price_change_percentage_24h)}%
            </TableCell>
            <TableCell align="right">{formatLargeDigits(coin.market_cap, currencySymbol)}</TableCell>
            <TableCell align="right">{formatLargeDigits(coin.total_volume, currencySymbol)}</TableCell>
            <TableCell align="right">
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
                <Typography sx={{ fontSize: 12 }}>{formatLargeDigits(coin.total_supply, "")}</Typography>
                <Typography sx={{ textTransform: "uppercase", fontSize: 12 }}>{coin.symbol}</Typography>
              </Box>
            </TableCell>

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