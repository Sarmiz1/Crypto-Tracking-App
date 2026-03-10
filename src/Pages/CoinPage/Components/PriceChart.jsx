import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";
import { Box, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function PriceChart({ coinId, currencyName, currencySymbol, mode }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [days, setDays] = useState(7);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch chart data with retry for 429
  useEffect(() => {
    const fetchChart = async (retries = 3, delay = 1000) => {
      setLoading(true);
      for (let i = 0; i < retries; i++) {
        try {
          const res = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
            { params: { vs_currency: currencyName, days } }
          );
          setChartData(res.data.prices);
          setLoading(false);
          return;
        } catch (err) {
          if (err.response?.status === 429) {
            console.warn("Rate limit hit, retrying...");
            await new Promise(res => setTimeout(res, delay));
          } else {
            console.error("Chart fetch error:", err);
            setChartData([]);
            setLoading(false);
            return;
          }
        }
      }
      console.error("Failed to fetch chart after retries.");
      setChartData([]);
      setLoading(false);
    };

    fetchChart();
  }, [coinId, currencyName, days]);

  if (loading) return <div>Loading chart...</div>;
  if (!chartData.length) return <div>No chart data</div>;

  const data = {
    labels: chartData.map(coin => new Date(coin[0]).toLocaleDateString()),
    datasets: [
      {
        label: `Price (${currencySymbol})`,
        data: chartData.map(coin => coin[1]),
        borderColor: isDark ? "#7dd3fc" : "#1976d2",
        backgroundColor: isDark ? "rgba(125,211,252,0.15)" : "rgba(25,118,210,0.15)",
        fill: true,
        tension: 0.35,
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }, ticks: { color: isDark ? "#cbd5f5" : "#555" } },
      y: { grid: { color: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }, ticks: { color: isDark ? "#cbd5f5" : "#555" } }
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant={days === 7 ? "contained" : "outlined"} onClick={() => setDays(7)}>7D</Button>
        <Button variant={days === 30 ? "contained" : "outlined"} onClick={() => setDays(30)}>30D</Button>
        <Button variant={days === 365 ? "contained" : "outlined"} onClick={() => setDays(365)}>1Y</Button>
      </Stack>
      <Line data={data} options={options} />
    </Box>
  );
}