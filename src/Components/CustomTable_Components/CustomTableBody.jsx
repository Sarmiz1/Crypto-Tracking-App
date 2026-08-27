import { memo, useContext, useCallback, useMemo } from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, XAxis, YAxis } from "recharts";
import currencyFormat from "../../utils/currencyFormat";
import { formatLargeDigits } from "../../utils/formatLargeDigits";
import { appContext } from "../../Context/AppContextProvider";

// ⚡ CustomTableRow: Memoized individual row component to prevent unnecessary re-renders
const CustomTableRow = memo(function CustomTableRow({
  coin,
  index,
  stickyBg,
  currencySymbol,
  section,
  isWatched,
  isDark,
  onWatchlistToggle,
}) {
  let rankDisplay;
  if (section === "watchlist") rankDisplay = "__";
  else if (section === "top") rankDisplay = coin.market_cap_rank;
  else rankDisplay = index + 1;

  const change = Number(coin.price_change_percentage_24h);
  const isPositive = !isNaN(change) && change >= 0;

  // Memoize chart data formatting per row
  const chartData = useMemo(() => {
    return (coin.chart || []).map((price, idx) => ({
      time: idx,
      value: price,
    }));
  }, [coin.chart]);

  return (
    <TableRow
      hover
      sx={{
        "&:hover": {
          backgroundColor: isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.04)",
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: 55, sm: 56, md: 80 },
            overflow: "hidden",
          }}
        >
          <IconButton
            size="small"
            onClick={() => onWatchlistToggle(coin)}
          >
            {isWatched ? (
              <StarIcon sx={{ color: "#FFD700" }} fontSize="small" />
            ) : (
              <StarBorderIcon fontSize="small" />
            )}
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: { xs: 100, sm: 160, md: 220 },
            overflow: "hidden",
            gap: 1,
          }}
        >
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

      <TableCell align="right">
        {currencyFormat(coin.current_price, { symbol: currencySymbol })}
      </TableCell>
      <TableCell
        align="right"
        sx={{ color: isPositive ? "success.main" : "error.main" }}
      >
        {isPositive ? "+" : ""}
        {currencyFormat(coin.price_change_percentage_24h)}%
      </TableCell>
      <TableCell align="right">
        {formatLargeDigits(coin.market_cap, currencySymbol)}
      </TableCell>
      <TableCell align="right">
        {formatLargeDigits(coin.total_volume, currencySymbol)}
      </TableCell>
      <TableCell align="right">
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
          <Typography sx={{ fontSize: 12 }}>
            {formatLargeDigits(coin.total_supply, "")}
          </Typography>
          <Typography sx={{ textTransform: "uppercase", fontSize: 12 }}>
            {coin.symbol}
          </Typography>
        </Box>
      </TableCell>

      {/* Sparkline chart - fixed width/height directly on LineChart to bypass ResponsiveContainer ResizeObserver overhead */}
      <TableCell align="right">
        <Box sx={{ height: 50, width: 120 }}>
          <LineChart width={120} height={50} data={chartData}>
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
        </Box>
      </TableCell>
    </TableRow>
  );
});

export default function CustomTableBody({
  coins,
  stickyBg,
  currency,
  section = "table",
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const {
    watchList: { watchlist, setWatchlist },
  } = useContext(appContext);

  const { symbol: currencySymbol } = currency || {};

  // ⚡ Stable callback using functional state updater pattern
  const handleWatchlistToggle = useCallback(
    (coin) => {
      setWatchlist((prevWatchlist) => {
        if (prevWatchlist.some((c) => c.id === coin.id)) {
          return prevWatchlist.filter((c) => c.id !== coin.id);
        } else {
          return [...prevWatchlist, coin];
        }
      });
    },
    [setWatchlist]
  );

  return (
    <TableBody>
      {coins.map((coin, index) => {
        const isWatched = watchlist.some((c) => c.id === coin.id);
        return (
          <CustomTableRow
            key={coin.id}
            coin={coin}
            index={index}
            stickyBg={stickyBg}
            currencySymbol={currencySymbol}
            section={section}
            isWatched={isWatched}
            isDark={isDark}
            onWatchlistToggle={handleWatchlistToggle}
          />
        );
      })}
    </TableBody>
  );
}