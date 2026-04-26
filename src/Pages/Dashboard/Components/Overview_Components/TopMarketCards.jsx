import CustomDashboardMarketCards from "./TopMarket_Components/CustomDashboardMarketCards";
import { useContext } from "react";
import { AppContext } from "../../../../Context/appContext";

export default function TopMarketCards({ setSelectedCoin }) {
  const {currency, cryptoListing, mode} = useContext(AppContext)

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
