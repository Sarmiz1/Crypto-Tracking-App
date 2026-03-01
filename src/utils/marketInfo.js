import { useContext } from "react";
import { appContext } from "../Context/AppContextProvider";
import { formatLargeDigits } from "./formatLargeDigits";

export const MarketInfo = () => {
  const { currency, globalMetrics, defi, stableCoins, bitcoin } =
    useContext(appContext);

  const { name: currencyName, symbol: currencySymbol } = currency;
  const { data, fearGreed } = globalMetrics || {};
  const { data: defiData } = defi || {};
  const { data: stableCoinsData } = stableCoins || {};
  const { data: btc } = bitcoin || {};

  // Safe access to market cap (using bracket notation)
  const currencyKey = currencyName.toLowerCase(); // 'usd', 'ngn', 'eur'
  const marketCapRaw = data?.data?.total_market_cap?.[currencyKey];
  const marketCapFormatted = formatLargeDigits(marketCapRaw, currencySymbol);

  // Crypto Volum
  const marketVolume = data?.data?.total_volume?.[currencyKey];
  const marketVolumeFormatted = formatLargeDigits(
    marketVolume,
    currencySymbol,
    1,
  );

  // 24h change (from your global data)
  const change24h = data?.market_cap_change_percentage_24h_usd || 0;

  // 24h volume change (from your global data)
  const marketVolumeChange24 = formatLargeDigits(
    data?.data?.volume_change_percentage_24h_usd || 0,
    "",
  );

  // Defi info
  const defiVolume24 = defiData?.data?.trading_volume_24h || 0; //Volume
  const defiVolume24Formatted = formatLargeDigits(defiVolume24); // formatted volume
  const defiVolumePercentage = formatLargeDigits(
    (defiVolume24 / marketVolume) * 100,
    "",
  );

  // Stablecoins info
  const stablecoinVolume = stableCoinsData?.reduce(
    (acc, coin) => acc + coin.total_volume,
    0,
  );
  const stablecoinVolumeFormatted = formatLargeDigits(
    stablecoinVolume,
    currencySymbol,
    1,
  );
  const stablecoinVolumePercent = formatLargeDigits(
    (stablecoinVolume / marketVolume) * 100,
    "",
  );

  // Bitcoin dominance
  const btcDominance = data?.data?.market_cap_percentage?.btc || 0;
  const btcDominanceFormatted = formatLargeDigits(btcDominance, '')

  const btcMarketCap = btc?.[0]?.market_cap || 0;
  const btcMarketCapChange = btc?.[0]?.market_cap_change_24h || 0;

  const totalMarketCap = marketCapRaw || 0;
  const totalMarketCapChangePercent =
    data?.data?.market_cap_change_percentage_24h_usd || 0;

  // Previous values
  const previousBTCMarketCap = btcMarketCap - btcMarketCapChange;

  const previousTotalMarketCap =
    totalMarketCap / (1 + totalMarketCapChangePercent / 100);

  // Previous dominance
  const previousDominance =
    (previousBTCMarketCap / previousTotalMarketCap) * 100;

  // 24h change
  const btcDominanceChange = formatLargeDigits(btcDominance - previousDominance, '');

  // Eth dominance
  const ethDominance = data?.data?.market_cap_percentage?.eth || 0;
  const ethDominanceFormatted = formatLargeDigits(ethDominance, '');

  // Fear and Greed
  const fearGreedValue = Number(fearGreed?.value || 0);
  const fearGreedClassification =
    fearGreed?.value_classification || "Neutral";

  return {
    marketVolume:  marketVolumeFormatted ,
    volumeChange:  marketVolumeChange24 ,
    defiVolume:  defiVolume24Formatted ,
    defiVolumePercent:  defiVolumePercentage ,
    stableCoinVolume:  stablecoinVolumeFormatted ,
    stableCoinVolumePercent:  stablecoinVolumePercent ,
    btcDominance:  btcDominanceFormatted ,
    btcDominanceChange:  btcDominanceChange ,
    marketCap:  marketCapFormatted ,
    marketCapChange:  change24h ,
    ethDominance:  ethDominanceFormatted ,
    fearGreed: {
      value: fearGreedValue ,
      classification: fearGreedClassification ,
    },
  }
}