import CustomTable from "../../../Components/CustomTable";
import CustomTabPanel from "../../../Components/CustomTabPanel";
import { useContext } from "react";
import { appContext } from "../../../Context/AppContextProvider";

export default function TopCoinTable({ value }) {
  
  const {cryptoListing, currency} = useContext(appContext);
  const {data, loading, error} = cryptoListing;

   // Map CoinGecko data to match your table
  const mappedData = data?.map((coin) => ({
    id: coin.id,
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
      {loading && <p>Loading coins...</p>}
      {error && <p>Error: {error}</p>}
      {mappedData && <CustomTable coins={mappedData} currency={currency}/>}
    </CustomTabPanel>
  );
}



