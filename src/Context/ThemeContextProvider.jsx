import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMemo } from "react";

export default function ThemeContextProvider({ mode, children }) {
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: "#4169E1",
          dark: "#1976d2",
          light: "#87CEEB",
        },
        secondary: {
          main: "#dc004e",
        },
      },
      typography: {
        fontFamily: "Roboto, Arial, Sans-Serif",
      },
    });
  }, [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}