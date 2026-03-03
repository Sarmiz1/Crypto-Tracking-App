import { Paper } from "@mui/material";
import { useState } from "react";
import SpotFilters from "./SpotFilterTable_Components/SpotFilters";
import SpotTable from "./SpotFilterTable_Components/SpotTable";

export const SpotFilterTable = ({ mode }) => {
  const [search, setSearch] = useState("");
  const [marketType, setMarketType] = useState("All");

  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 3 },
        backgroundColor: mode === "dark" ? "#1e1e1e" : "#fff",
        borderRadius: 3,
      }}
    >
      <SpotFilters
        search={search}
        setSearch={setSearch}
        marketType={marketType}
        setMarketType={setMarketType}
      />

      <SpotTable search={search} marketType={marketType} />
    </Paper>
  );
};