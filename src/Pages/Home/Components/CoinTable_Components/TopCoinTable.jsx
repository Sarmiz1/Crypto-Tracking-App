import CustomTable from "../../../../Components/CustomTable";
import CustomTabPanel from "../../../../Components/CustomTabPanel";
import { useContext } from "react";
import { appContext } from "../../../../Context/AppContextProvider";

export default function TopCoinTable({ value }) {
  
  const {cryptoListing, currency} = useContext(appContext);
  const {data: topCoins, loading:topLoading, error: topError} = cryptoListing;


  // Map CoinGecko data to match your table
  const mappedData = topCoins?.map((coin) => ({
    id: coin.id,
    symbol: coin.symbol,
    market_cap_rank: coin.market_cap_rank,
    name: coin.name,
    image: coin.image,
    current_price: coin.current_price,
    price_change_percentage_24h: coin.price_change_percentage_24h,
    market_cap: coin.market_cap,
    total_volume: coin.total_volume,
    total_supply: coin.total_supply,
    chart: coin.sparkline_in_7d?.price || [], // line chart
  }));

  return (
    <CustomTabPanel value={value} index={0}>
      {topLoading && <p>Loading coins...</p>}
      {topError && <p>Failed to load Table</p>}
      {mappedData && <CustomTable coins={mappedData} currency={currency}/>}
    </CustomTabPanel>
  );
}



