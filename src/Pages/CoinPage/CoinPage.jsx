import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

import PriceChart from "./Components/PriceChart";
import { Header } from "./Components/Header";
import { appContext } from "../../Context/AppContextProvider";
import { Price } from "./Components/Price";
import { Stats } from "./Components/Stats";

export default function CoinPage() {
  const { id } = useParams(); // CoinGecko coin ID
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currency, mode } = useContext(appContext);
  const lowerCurrency = currency.name.toLowerCase(); // for CoinGecko keys
  const currencySymbol = currency.symbol; // for display

  useEffect(() => {
    const fetchCoin = async () => {
      setLoading(true);
      try {
        const coinRes = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
          params: {
            localization: false,
            tickers: false,
            community_data: false,
            developer_data: false,
            sparkline: false,
          },
        });
        setCoin(coinRes.data);
      } catch (err) {
        console.error("Failed to fetch coin data:", err);
        setCoin(null);
      }
      setLoading(false);
    };

    fetchCoin();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!coin) {
    return (
      <Box sx={{ maxWidth: 1000, mx: "auto", mt: 10, p: 2 }}>
        <Typography textAlign="center">No coin found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 10, p: 2 }}>
      <Paper sx={{ p: 4 }}>
        <Header coin={coin} />

        <Price
          coin={coin}
          currencySymbol={currencySymbol}
          currentPrice={coin.market_data.current_price[lowerCurrency]}
        />

        <Stats
          coin={coin}
          currencySymbol={currencySymbol}
          marketCap={coin.market_data.market_cap[lowerCurrency]}
          volume={coin.market_data.total_volume[lowerCurrency]}
          change={coin.market_data.price_change_percentage_24h}
        />

        <Box sx={{ mt: 5 }}>
          <PriceChart
            coinId={coin.id}
            mode={mode}
            currencyName={lowerCurrency}
            currencySymbol={currencySymbol}
          />
        </Box>
      </Paper>
    </Box>
  );
}