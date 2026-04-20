import { TableBody } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useContext, useCallback } from "react";
import { appContext } from "../../Context/AppContext";
import CoinTableRow from "./CoinTableRow";

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

  const handleWatchlistToggle = useCallback((coin) => {
    setWatchlist((prevWatchlist) => {
      if (prevWatchlist.some((c) => c.id === coin.id)) {
        return prevWatchlist.filter((c) => c.id !== coin.id);
      } else {
        return [...prevWatchlist, coin];
      }
    });
  }, [setWatchlist]);

  return (
    <TableBody>
      {coins.map((coin, index) => {
        const isWatched = watchlist.some((c) => c.id === coin.id);

        return (
          <CoinTableRow
            key={coin.id}
            coin={coin}
            index={index}
            section={section}
            isWatched={isWatched}
            handleWatchlistToggle={handleWatchlistToggle}
            stickyBg={stickyBg}
            currencySymbol={currencySymbol}
            isDark={isDark}
          />
        );
      })}
    </TableBody>
  );
}