import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { formatLargeDigits } from '../../../../../utils/formatLargeDigits';
import { appContext } from "../../../../../Context/AppContextProvider";
import ErrorDisplay from '../../../../../Components/ErrorDisplay';
import LoadingState from '../../../../../Components/LoadingState';


export default function ContentCardsBox({ scrollRef }) {
  const { globalMetrics, currency } = useContext(appContext);
  const { symbol: currencySymbol = '$' } = currency || {};

  // Correct destructuring
  const {
    data: globalData,       // Already the /global data object
    loading: globalLoading,
    error: globalError,
    fearGreed,               // Already the single Fear & Greed object
  } = globalMetrics || {};

  // Loading state
  if (globalLoading)  return <LoadingState />

  // Error state
  if (globalError || !globalData) 
    return <ErrorDisplay message={`Failed to load global metrics: ${globalError || "No data"}`} />
          
  // Safe global metrics values
  const totalMarketCap = globalData?.total_market_cap?.[currency?.name?.toLowerCase()] || 0;
  const totalVolume = globalData?.total_volume?.[currency?.name?.toLowerCase()] || 0;
  const btcDominance = globalData?.market_cap_percentage?.btc?.toFixed(2) || "N/A";

  // Fear & Greed values
  const fearValue = fearGreed?.value || "--";
  const fearLabel = fearGreed?.value_classification || "";
  const gaugeValue = Number(fearValue) || 0;

  // Cards array
  const cards = [
    {
      name: "Global Market Cap",
      value: formatLargeDigits(totalMarketCap, currencySymbol),
    },
    {
      name: "24h Volume",
      value: formatLargeDigits(totalVolume, currencySymbol),
    },
    {
      name: "BTC Dominance",
      value: btcDominance + "%",
    },
    {
      name: "Fear & Greed Index",
      value: fearValue,
      type: "fear",
      gaugeValue: gaugeValue,
      label: fearLabel,
    },
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

            {/* Fear & Greed Gauge */}
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
                  sx={{ mt: 1, color: item.gaugeValue >= 50 ? "success.main" : "error.main" }}
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