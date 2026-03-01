import CustomDashboardMarketCards from "./CustomDashboardMarketCards";
import { useContext } from "react";
import { appContext } from "../../../Context/AppContextProvider";

export default function TopMarketCards({ setSelectedCoin, darkMode }) {
  const {currency, cryptoListing} = useContext(appContext)

  return (
    <>
      <CustomDashboardMarketCards 
        setSelectedCoin={setSelectedCoin} 
        darkMode={darkMode} 
        cryptoListing={cryptoListing} 
        currency={currency} 
      />
    </>
  )
}
