import './App.css'
import FormTwo from './Pages/FormTwo'
import SignUpForm from './Pages/SignUpForm'
import LoginForm from './Pages/LoginForm'
import ProfileForm from './Pages/ProfileForm'
import SignUpForm_ from './Pages/Assign'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes } from 'react-router-dom'
import CssBaseline from "@mui/material/CssBaseline";
import MaterialDesignOne from './Pages/MateriaDesignOne'
import NavBar from './Components/NavBar'
import HomePage from './Pages/Home/Home'
import Watchlist from './Pages/Watchlist/Watchlist'
import { useState } from 'react'
import { Button } from '@mui/material'
import appContext from './Context/appContext'




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
        tabValue: tabValue,
        handleTabChange: handleTabChange
      }}>
        <NavBar setMode={setMode} mode={mode}/>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
        <Routes>
          <Route path='/watchlist' element={<Watchlist />} />
        </Routes>
      </appContext.Provider>
    </ThemeProvider>
  );
}

export default App;

