import { Container } from "@mui/material"
import TabsSection from "../../Components/TabsSection"
import MetricCards from "../../Components/MetricCards"
import { useContext } from "react";
import appContext from "../../Context/appContext";
import CustomTable from "../../Components/CustomTable";


export default function Watchlist() {

  const coins = [
    {
      rank: 1,
      name: "Tether",
      symbol: "USDT",
      price: 0.99,
      change24h: 0.02,
      marketCap: "$99,995,578,123",
      volume: "$18,734,000,000",
      supply: "83.7B USDT",
      chart: [30, 25, 22, 18, 15, 12, 10]
    },
  ];

  const { tabValue } = useContext(appContext)


  return(
    <Container 
      spacing='2'
      sx={{
        mt: 10
      }}
    > 
      {tabValue !== 2 && <MetricCards />}
      <CustomTable coins={coins} />
    </Container>
  )
}