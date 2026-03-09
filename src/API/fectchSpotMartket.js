// ./API/fetchSpotMarket.js
import axios from "axios";

export async function fetchSpotMarket(
  vsCurrency = "usd",
  page = 1,
  perPage = 30
) {
  try {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: vsCurrency,
          order: "market_cap_desc",
          per_page: perPage,
          page,
          sparkline: false,
        },
      }
    );

    return res.data.map((coin) => ({
      id: coin.id,
      pair: `${coin.symbol.toUpperCase()}/${vsCurrency.toUpperCase()}`,
      price: Number(coin.current_price),
      change: Number(coin.price_change_percentage_24h),
      volume: Number(coin.total_volume),
      type: "CEX",
      exchange: "CoinGecko",
    }));
  } catch (err) {
    console.error("Error fetching spot market:", err);
    return [];
  }
}

export function generateSparkline(price) {
  return Array.from({ length: 7 }, () => ({
    value: price * (1 + (Math.random() - 0.5) * 0.02),
  }));
}








