import { Box, Card, CardContent, Typography } from "@mui/material";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { appContext } from "../../../../Context/AppContextProvider";
import { useContext } from "react";
import { formatLargeDigits } from '../../../../utils/formatLargeDigits'

export default function ContentCardsBox({ scrollRef }) {
  const { globalMetrics, currency } = useContext(appContext);

  const { symbol: currencySymbol } = currency || {};
  const { data, loading, error, fearGreed } = globalMetrics || {};


  // ✅ Loading state
  if (loading) {
    return (
      <Box sx={{ px: 6, py: 4 }}>
        <Typography>Loading metrics...</Typography>
      </Box>
    );
  }

  // ✅ Error state
  if (error || !data) {
    return (
      <Box sx={{ px: 6, py: 4 }}>
        <Typography color="error">Failed to load global metrics.</Typography>
      </Box>
    );
  }

  // 🔥 Build cards array manually
  const cards = [
    {
      name: "Global Market Cap",
      value:
        formatLargeDigits(
        (data?.data?.total_market_cap?.usd || 0), currencySymbol),
    },
    {
      name: "24h Volume",
      value:
        formatLargeDigits(
        (data?.data?.total_volume?.usd || 0), currencySymbol),
    },
    {
      name: "BTC Dominance",
      value:
        (data?.data?.market_cap_percentage?.btc || 0).toFixed(2) + "%",
    },
    {
      name: "Fear & Greed Index",
      value: fearGreed?.value || "--",
      type: "fear",
      gaugeValue: fearGreed?.value || 0,
      label: fearGreed?.value_classification || "",
    },
    // Sparkline example (if you have one)
    // {
    //   name: "Sample Sparkline",
    //   type: "sparkline",
    //   sparkline: [{ v: 10 }, { v: 12 }, { v: 8 }, { v: 14 }],
    //   isPositive: true,
    // },
  ];

  return (
    <Box
      ref={scrollRef}
      sx={{
        display: "flex",
        gap: 3,
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        px: 6,
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {cards.map((item, index) => (
        <Card
          key={index}
          sx={{
            minWidth: 380,
            flex: "0 0 auto",
            scrollSnapAlign: "start",
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            },
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              {item.name}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              {item.value}
            </Typography>

            {/* Fear & Greed */}
            {item.type === "fear" && (
              <>
                <Box
                  sx={{
                    position: "relative",
                    height: 10,
                    borderRadius: 6,
                    background:
                      "linear-gradient(90deg, #ea3943 0%, #f7931a 40%, #f3ba2f 60%, #16c784 100%)",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      left: `${item.gaugeValue}%`,
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      bgcolor: "#111",
                      border: "3px solid white",
                      boxShadow: 2,
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "success.main" }}
                >
                  {item.label}
                </Typography>
              </>
            )}

            {/* Sparkline placeholder */}
            {item.type === "sparkline" && (
              <Box sx={{ height: 70 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.sparkline}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={item.isPositive ? "#16c784" : "#ea3943"}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}