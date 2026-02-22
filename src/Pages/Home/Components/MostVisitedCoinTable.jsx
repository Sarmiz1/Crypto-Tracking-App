import CustomTabPanel from "../../../Components/CustomTabPanel";
import CustomTable from "../../../Components/CustomTable";


export default function MostVisitedCoinTable({ value }) {

  const coins = [
    {
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 67903.32,
      change24h: -0.13,
      marketCap: "$1,357,550,467,871",
      volume: "$47,071,745,849",
      supply: "19.9M BTC",
      chart: [10, 20, 18, 25, 22, 28, 26]
    },
    {
      rank: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: 1965.09,
      change24h: -0.10,
      marketCap: "$237,171,690,401",
      volume: "$21,397,607,899",
      supply: "120.69M ETH",
      chart: [15, 18, 17, 19, 16, 20, 18]
    },
    {
      rank: 3,
      name: "Tether",
      symbol: "USDT",
      price: 0.99,
      change24h: 0.02,
      marketCap: "$99,995,578,123",
      volume: "$18,734,000,000",
      supply: "83.7B USDT",
      chart: [30, 25, 22, 18, 15, 12, 10]
    }
  ];

  return (
    <CustomTabPanel value={value} index={4}>
      <CustomTable coins={coins}/>
    </CustomTabPanel>
  );
}