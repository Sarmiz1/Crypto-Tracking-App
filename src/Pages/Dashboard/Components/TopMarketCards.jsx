import CustomDashboardMarketCards from "./CustomDashboardMarketCards";
export default function TopMarketCards({ setSelectedCoin, darkMode }) {

  // Dummy sparkline data – replace with real data later
  const dummySparkline = [
    { value: 10 },
    { value: 18 },
    { value: 15 },
    { value: 22 },
    { value: 19 },
    { value: 28 },
    { value: 24 },
    { value: 30 },
    { value: 26 },
    { value: 32 },
    { value: 28 },
    { value: 25 },
  ];

  // Static data (update with API later)
    const coins = [
      {
        name: "Bitcoin",
        symbol: "BTC",
        price: "64,290.79",
        change: -0.76,
        marketCap: "$1.28T",
        volume24h: "$44B",
        sparkline: dummySparkline,
        logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035",
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        price: "1,860.55",
        change: -0.18,
        marketCap: "$223B",
        volume24h: "$20B",
        sparkline: dummySparkline.map((d) => ({ value: d.value * 0.9 })),
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035",
      },
      {
        name: "BNB",
        symbol: "BNB",
        price: "587.67",
        change: -1.78,
        marketCap: "$80B",
        volume24h: "$1.8B",
        sparkline: dummySparkline.map((d) => ({ value: d.value * 1.1 })),
        logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=035",
      },
      {
        name: "Solana",
        symbol: "SOL",
        price: "78.27",
        change: 0.4,
        marketCap: "$44B",
        volume24h: "$3.8B",
        sparkline: dummySparkline.map((d) => ({ value: d.value * 1.2 })),
        logo: "https://cryptologos.cc/logos/solana-sol-logo.png?v=035",
      },
      {
        name: "XRP",
        symbol: "XRP",
        price: "1.3606",
        change: 0.14,
        marketCap: "$83B",
        volume24h: "$2.8B",
        sparkline: dummySparkline.map((d) => ({ value: d.value * 0.7 })),
        logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=035",
      },
    ];

  return (
    <>
      <CustomDashboardMarketCards setSelectedCoin={setSelectedCoin} darkMode={darkMode} coins={coins} />
    </>
  )
}
