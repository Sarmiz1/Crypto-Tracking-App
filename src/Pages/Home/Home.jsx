import { Container, Divider } from "@mui/material";
import HeroSection from "./Components/HeroSection";
import TabsSection from "../../Components/TabsSection";
import MetricCards from "../../Components/MetricCards";
import TopCoinTable from "./Components/TopCoinTable";
import TrendingCoinTable from "./Components/TrendingCoinTable";
import Watchlist from "../Watchlist/Watchlist";
import MostVisitedCoinTable from "./Components/MostVisitedCoinTable";
import NewCoinTable from "./Components/NewCoinTable";
import PredictionMarket from "./Components/PredictionMarket";
import CustomTabPanel from "../../Components/CustomTabPanel";
import { useContext } from "react";
import appContext from "../../Context/appContext";
import InfoSection from "./Components/InfoSection";
import SubscribeSection from "./Components/SubscribeSection";

export default function HomePage() {
  const { tabValue, handleTabChange } = useContext(appContext);

  return (
    <>
      <HeroSection />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <TabsSection value={tabValue} handleChange={handleTabChange} />

        {/* Show metrics on all tabs except index 2 (Watchlist tab) */}
        {tabValue !== 2 && <MetricCards />}

        <TopCoinTable value={tabValue} />
        <TrendingCoinTable value={tabValue} />

        <CustomTabPanel value={tabValue} index={2}>
          <Watchlist />
        </CustomTabPanel>

        <MostVisitedCoinTable value={tabValue} />
        <NewCoinTable value={tabValue} />
        <PredictionMarket value={tabValue} />

        <InfoSection />
        <Divider sx={{ my: 3, borderBottomWidth: 2 }} />
        <SubscribeSection />
      </Container>
    </>
  );
}
