import CustomDashboardMarketCards from "./TopMarket_Components/CustomDashboardMarketCards";
import { useContext } from "react";
import { appContext } from "../../../../Context/AppContextProvider";

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
