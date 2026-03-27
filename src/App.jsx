import { Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import DefaultLayout from "./Layouts/DefaultLayout";
import Watchlist from "./Pages/Watchlist/Watchlist";
import Footer from "./Components/Footer";
import Exchange from "./Pages/Exchanges/Exchanges";
import DexscanPage from "./Pages/DexScan/DexscanPage";
import PortFolio from "./Pages/Portfolio/Portfolio";
import ThemeContextProvider from "./Context/ThemeContextProvider";
import { appContext } from "./Context/AppContextProvider";
import { useContext, lazy, useState } from "react";
import AuthPage from "./Pages/AuthPage/AuthPage";
import CoinPage from "./Pages/CoinPage/CoinPage"
import DashboardLayout from "./Layouts/DashboardLayout";

const HomePage = lazy(() => import("./Pages/Home/Home"));
const DashboardPage = lazy(() => import("./Pages/Dashboard/DashboardPage"));


function App() {
  const { mode, setMode } = useContext(appContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <ThemeContextProvider mode={mode}>
      <CssBaseline />

      <Routes>
        {/* Default pages */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/exchanges" element={<Exchange />} />
          <Route path="/dexscan" element={<DexscanPage />} />
          <Route path="/portfolio" element={<PortFolio />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/createAccount" element={<AuthPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Route>

        <Route element={
          <DashboardLayout
            mode={mode}
            setMode={setMode}
            setMobileOpen={setMobileOpen}
            isMobile={isMobile}
          />}
        >
          <Route path="/dashboard" element={
            <DashboardPage
              mode={mode}
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
              isMobile={isMobile}
            />}
          />
        </Route>
      </Routes>

      <Footer />
    </ThemeContextProvider>
  );
}

export default App;
