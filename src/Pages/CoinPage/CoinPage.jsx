import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";

import PriceChart from "./Components/PriceChart";
import { Header } from "./Components/Header";
import { appContext } from "../../Context/AppContextProvider";
import { Price } from "./Components/Price";
import { Stats } from "./Components/Stats";

export default function CoinPage() {
  const { id } = useParams(); // search query or coin name
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  const { currency, mode } = useContext(appContext);
  const { name: currencyName, symbol: currencySymbol } = currency;

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        // 1️⃣ Search coin by name
        const searchRes = await axios.get(
          `https://api.coingecko.com/api/v3/search`,
          { params: { query: id } }
        );

        const firstCoin = searchRes.data.coins[0];

        if (!firstCoin) {
          setCoin(null);
          setLoading(false);
          return;
        }

        // 2️⃣ Fetch coin data
        const coinRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${firstCoin.id}`,
          { params: { localization: false, tickers: false, community_data: false, developer_data: false, sparkline: false } }
        );

        setCoin(coinRes.data);

      } catch (err) {
        console.log(err);
        setCoin(null);
      }
      setLoading(false);
    };

    fetchCoin();
  }, [id, currencyName]); // re-fetch when currency changes

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
          currentPrice={coin.market_data.current_price[currencyName.toLowerCase()]}
        />

        <Stats
          coin={coin}
          currencySymbol={currencySymbol}
          marketCap={coin.market_data.market_cap[currencyName.toLowerCase()]}
          volume={coin.market_data.total_volume[currencyName.toLowerCase()]}
          change={coin.market_data.price_change_percentage_24h}
        />

        <Box sx={{ mt: 5 }}>
          <PriceChart
            coinId={coin.id}
            mode={mode}
            currencySymbol={currencySymbol}
          />
        </Box>
      </Paper>
    </Box>
  );
}