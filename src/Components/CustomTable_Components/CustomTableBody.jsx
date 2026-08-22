import React, { useContext } from "react";
import { TableBody } from "@mui/material";
import { useTheme } from "@mui/material/styles";
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

  return (
    <TableBody>
      {coins.map((coin, index) => {
        const isWatched = watchlist.some((c) => c.id === coin.id);

        return (
          <CustomTableRow
            key={coin.id}
            coin={coin}
            index={index}
            section={section}
            isDark={isDark}
            stickyBg={stickyBg}
            currencySymbol={currencySymbol}
            isWatched={isWatched}
            setWatchlist={setWatchlist}
          />
        );
      })}
    </TableBody>
  );
}
