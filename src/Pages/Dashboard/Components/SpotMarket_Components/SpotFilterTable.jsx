import { Paper } from "@mui/material";
import { useState, useContext } from "react";
import SpotFilters from "./SpotFilterTable_Components/SpotFilters";
import SpotTable from "./SpotFilterTable_Components/SpotTable";
import { appContext } from "../../../../Context/AppContextProvider";

export const SpotFilterTable = () => {
  const { mode, currency, spotMarket } = useContext(appContext) || {}
  const darkMode = mode === 'dark'

  const [search, setSearch] = useState("");
  const [marketType, setMarketType] = useState("All");

  return (
    <Paper
      sx={{
        p: 3,
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        borderRadius: 3,
      }}
    >
      <SpotFilters
        search={search}
        setSearch={setSearch}
        marketType={marketType}
        setMarketType={setMarketType}
        darkMode={darkMode}
      />

      <SpotTable search={search} marketType={marketType} darkMode={darkMode} />
    </Paper>
  );
};
