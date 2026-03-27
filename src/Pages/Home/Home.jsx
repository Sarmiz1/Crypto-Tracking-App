import { Container, Divider, Box } from "@mui/material";
import HeroSection from "./Components/HeroSection";
import TabsSection from "../../Components/TabsSection";
import MetricCards from "../../Components/MetricCards";
import { useContext } from "react";
import { appContext } from "../../Context/AppContextProvider";
import InfoSection from "./Components/InfoSection";
import SubscribeSection from "./Components/SubscribeSection";
import CoinTable from "./Components/CoinTable";

export default function HomePage() {
  const { tabValue, handleTabChange } = useContext(appContext);


  return (
    <>
      <HeroSection />

      <Container maxWidth="xl" sx={{ mt: 3 }}>
        <TabsSection value={tabValue} handleChange={handleTabChange} />

        <MetricCards />

        <CoinTable tabValue={tabValue} />


        <InfoSection />
        <Divider sx={{ my: 3, borderBottomWidth: 2 }} />
        <SubscribeSection />
      </Container>
    </>
  );
}
