import { TableBody } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext, useCallback } from "react";
import { appContext } from "../../Context/AppContextProvider";
import CustomTableRow from "./CustomTableRow";

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

  // Memoize state updater callback using a functional updater to maintain reference stability
  const handleWatchlistToggle = useCallback((coin) => {
    setWatchlist((prev) => {
      if (prev.some((c) => c.id === coin.id)) {
        return prev.filter((c) => c.id !== coin.id);
      } else {
        return [...prev, coin];
      }
    });
  }, [setWatchlist]);

  return (
    <TableBody>
      {coins.map((coin, index) => {
        let rankDisplay;
        if (section === "watchlist") rankDisplay = "__";
        else if (section === "top") rankDisplay = coin.market_cap_rank;
        else rankDisplay = index + 1;

        const isWatched = watchlist.some((c) => c.id === coin.id);

        return (
          <CustomTableRow
            key={coin.id}
            coin={coin}
            rankDisplay={rankDisplay}
            isWatched={isWatched}
            currencySymbol={currencySymbol}
            stickyBg={stickyBg}
            isDark={isDark}
            onWatchlistToggle={handleWatchlistToggle}
          />
        );
      })}
    </TableBody>
  );
}
