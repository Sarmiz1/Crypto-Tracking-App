import CustomTabPanel from "../../../Components/CustomTabPanel";
import { Header } from "./Overview_Components/Header";
import TopMarketCards from "./Overview_Components/TopMarketCards";
import IndexSection from "./Overview_Components/IndexSection";
import CryptoMarketCapChart from "./CryptoMarketCapChart";
import CryptoETFsNetFlow from "./Overview_Components/CryptoETFsNetFlow";
import MarketTable from "./Overview_Components/MarketTable";

export default function Overview({ tab , mode, setSelectedCoin}) {
  return (
    <CustomTabPanel value={tab} index={0}>
      <Header mode={mode}/>
      <TopMarketCards 
        setSelectedCoin={setSelectedCoin} 
        mode={mode} 
      />
      <IndexSection mode={mode} />
      <CryptoMarketCapChart />
      <CryptoETFsNetFlow mode={mode} />
      {/* <AltcoinSeasonBar /> */}
      <MarketTable />
    </CustomTabPanel>
  );
}
