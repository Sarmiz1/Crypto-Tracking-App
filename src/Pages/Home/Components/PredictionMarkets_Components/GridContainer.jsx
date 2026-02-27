import { Grid } from "@mui/material";
import MarketCard from "../../../../Components/MarketCard";

export default function GridContainer({ Date, mode, filteredMarkets }) {
  return (
    <Grid container spacing={3}>
      {filteredMarkets.map((market) => {
        // ✅ Correct probability handling
        const probability =
          typeof market.probability === "number" ? market.probability : null;

        const yesProb =
          probability !== null ? (probability * 100).toFixed(1) : "N/A";

        const noProb =
          probability !== null ? ((1 - probability) * 100).toFixed(1) : "N/A";

        return (
          <Grid item xs={12} md={6} key={market.id}>
            <MarketCard
              title={market.question || "Untitled Market"}
              days={
                market.closeTime
                  ? Math.max(
                      0,
                      Math.ceil(
                        (market.closeTime - Date.now()) / (1000 * 60 * 60 * 24),
                      ),
                    ) + "d"
                  : "N/A"
              }
              totalVol={
                market.volume ? `$${market.volume.toLocaleString()}` : "N/A"
              }
              dayVol={
                market.volume24Hours
                  ? `$${market.volume24Hours.toLocaleString()}`
                  : "N/A"
              }
              options={[
                { name: "YES", value: yesProb },
                { name: "NO", value: noProb },
              ]}
              mode={mode}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
