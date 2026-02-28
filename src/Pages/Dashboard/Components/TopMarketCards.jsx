import CustomDashboardMarketCards from "./CustomDashboardMarketCards";
export default function TopMarketCards({ setSelectedCoin, darkMode }) {

  return (
    <>
      <CustomDashboardMarketCards setSelectedCoin={setSelectedCoin} darkMode={darkMode} />
    </>
  )
}
