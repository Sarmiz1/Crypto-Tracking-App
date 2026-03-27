import  { lazy, Suspense } from "react";
import CustomTabPanel from "../../../Components/CustomTabPanel";
import { Header } from "./Overview_Components/Header";
import TopMarketCards from "./Overview_Components/TopMarketCards";

const IndexSection = lazy(() => import("./Overview_Components/IndexSection"));
const CryptoMarketCapChart = lazy(() => import("./CryptoMarketCapChart"));
const CryptoETFsNetFlow = lazy(() => import("./Overview_Components/CryptoETFsNetFlow"));
const MarketTable = lazy(() => import("./Overview_Components/MarketTable"));


export default function Overview({ tab, mode, setSelectedCoin }) {
  return (
    <CustomTabPanel value={tab} index={0}>
      <Header mode={mode} />
      <TopMarketCards
        setSelectedCoin={setSelectedCoin}
        mode={mode}
      />

      <Suspense fallback={<p>Loading ...</p>}>
        <IndexSection mode={mode} />
      </Suspense>

      <Suspense fallback={<p>Loading table...</p>}>
        <CryptoMarketCapChart />
      </Suspense>

      <Suspense fallback={<p>Loading ...</p>}>
        <CryptoETFsNetFlow mode={mode} />
      </Suspense>

      {/* <AltcoinSeasonBar /> */}

      <Suspense fallback={<p>Loading table...</p>}>
        <MarketTable />
      </Suspense>

    </CustomTabPanel>
  );
}
