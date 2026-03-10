import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/Home/Home";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Footer from "./Components/Footer";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import Exchange from "./Pages/Exchanges/Exchanges";
import DexscanPage from "./Pages/DexScan/DexscanPage";
import PortFolio from "./Pages/Portfolio/Portfolio";
import ThemeContextProvider from "./Context/ThemeContextProvider";
import { appContext } from "./Context/AppContextProvider";
import { useContext } from "react";
import AuthPage from "./Pages/AuthPage/AuthPage";
import CoinPage from "./Pages/CoinPage/CoinPage"
function App() { 
  const { mode } = useContext(appContext);

  return (
    <ThemeContextProvider mode={mode}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <HomePage />
            </>
          }
        />
        <Route
          path="/watchlist"
          element={
            <>
              <NavBar />
              <Watchlist />
            </>
          }
        />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/exchanges" element={<Exchange />} />
        <Route path="/dexscan" element={<DexscanPage />} />
        <Route path="/portfolio" element={<PortFolio />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/createAccount" element={<AuthPage />} />

        <Route path="/coin/:id" element={
          <>
            <NavBar />
            <CoinPage />
          </>
        }/>
      </Routes>

      <Footer />
    </ThemeContextProvider>
  );
}

export default App;
