import CustomDashboardMarketCards from "./TopMarket_Components/CustomDashboardMarketCards";
import { useContext } from "react";
import { AppContext as appContext } from "../../../../Context/appContext";

export default function TopMarketCards({ setSelectedCoin }) {
  const {currency, cryptoListing, mode} = useContext(appContext)

  return (
    <>
      <CustomDashboardMarketCards 
        setSelectedCoin={setSelectedCoin} 
        mode={mode} 
        cryptoListing={cryptoListing} 
        currency={currency} 
      />
    </>
  )
}
