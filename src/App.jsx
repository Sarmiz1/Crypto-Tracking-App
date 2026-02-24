import './App.css'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from 'react-router-dom'
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from './Components/NavBar'
import HomePage from './Pages/Home/Home'
import Watchlist from './Pages/Watchlist/Watchlist'
import { useState } from 'react'
import appContext from './Context/appContext'
import Footer from './Components/Footer'
import DashboardPage from './Pages/Dashboard/DashboardPage';

function App() {

  const [mode, setMode] = useState("dark");
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4169E1',
        dark: '#1976d2',
        light: '#87CEEB'
      },
      secondary: {
        main: '#dc004e'
      },
      mode: mode
    },
    typography: {
      fontFamily: 'Roboto, Arial, Sans-Serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <appContext.Provider value={{
        tabValue,
        handleTabChange,
      }}>
        
        <Routes>
          <Route path='/' element={
            <>
              <NavBar setMode={setMode} mode={mode} />
              <HomePage />
            </>
            } />
          <Route path='/watchlist' element={
            <>
              <NavBar setMode={setMode} mode={mode} />
              <Watchlist />
            </>
          } />
          <Route path='/dashboard' element={<DashboardPage />} />
        </Routes>

        <Footer />
      </appContext.Provider>
    </ThemeProvider>
  );
}

export default App;