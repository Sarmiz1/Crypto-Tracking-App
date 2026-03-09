import { useContext } from "react";
import { appContext } from "../Context/AppContextProvider";
import { formatLargeDigits } from "./formatLargeDigits";

export const useMarketInfo = () => {
  const { currency, globalMetrics, defi, stableCoins, bitcoin, mode } = useContext(appContext);

  const { name: currencyName, symbol: currencySymbol } = currency || {};
  const { data, fearGreed } = globalMetrics || {};
  const { data: defiData } = defi || {};
  const { data: stableCoinsData } = stableCoins || {};
  const btcArray = bitcoin?.data || [];

  const currencyKey = currencyName?.toLowerCase() || 'usd';

  const marketCapRaw = data?.total_market_cap?.[currencyKey] || 0;
  const marketCapFormatted = formatLargeDigits(marketCapRaw, currencySymbol);
  

  const marketVolume = data?.total_volume?.[currencyKey] || 0;
  const marketVolumeFormatted = formatLargeDigits(marketVolume, currencySymbol, 1);

  const change24h = formatLargeDigits(data?.market_cap_change_percentage_24h_usd || 0, '');
  const marketVolumeChange24 = formatLargeDigits(data?.volume_change_percentage_24h_usd || 0, "");

  const defiVolume24 = defiData?.trading_volume_24h || 0;
  const defiVolume24Formatted = formatLargeDigits(defiVolume24);
  const defiVolumePercentage = marketVolume ? (defiVolume24 / marketVolume) * 100 : 0;

  const stablecoinVolume = stableCoinsData?.reduce((acc, coin) => acc + (coin.total_volume || 0), 0) || 0;
  const stablecoinVolumeFormatted = formatLargeDigits(stablecoinVolume, currencySymbol, 1);
  const stablecoinVolumePercent = marketVolume ? (stablecoinVolume / marketVolume) * 100 : 0;
  const stableCoinVolumeFormatted = formatLargeDigits(stablecoinVolumePercent, '')

  const btcMarketCap = btcArray[0]?.market_cap || 0;
  const btcMarketCapChange = btcArray[0]?.market_cap_change_24h || 0;

  const totalMarketCap = marketCapRaw;
  const totalMarketCapChangePercent = change24h;

  const previousBTCMarketCap = btcMarketCap - btcMarketCapChange;
  const previousTotalMarketCap = totalMarketCapChangePercent !== -100
    ? totalMarketCap / (1 + totalMarketCapChangePercent / 100)
    : totalMarketCap;

  const previousDominance = previousTotalMarketCap ? (previousBTCMarketCap / previousTotalMarketCap) * 100 : 0;
  const btcDominance = data?.market_cap_percentage?.btc || 0;
  const btcDominanceChange = formatLargeDigits(btcDominance - previousDominance, "");

  const ethDominance = data?.market_cap_percentage?.eth || 0;
  const ethDominanceFormatted = formatLargeDigits(ethDominance, "");

  const fearGreedValue = Number(fearGreed?.value || 0);
  const fearGreedClassification = fearGreed?.value_classification || "Neutral";

  return {
    marketVolume: marketVolumeFormatted,
    volumeChange: marketVolumeChange24,
    defiVolume: defiVolume24Formatted,
    defiVolumePercent: defiVolumePercentage,
    stableCoinVolume: stablecoinVolumeFormatted,
    stableCoinVolumePercent: stableCoinVolumeFormatted,
    btcDominance: formatLargeDigits(btcDominance, ''),
    btcDominanceChange: btcDominanceChange,
    marketCap: marketCapFormatted,
    marketCapChange: change24h,
    ethDominance: ethDominanceFormatted,
    fearGreed: {
      value: fearGreedValue,
      value_classification: fearGreedClassification,
    },
    mode: mode
  };
};