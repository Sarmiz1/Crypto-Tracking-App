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
import { dataFunction } from "../Features/priceChartData";
import { optionsFunction } from "../Features/priceChartsOptions";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function PriceChart({ coinId, mode, currencyName }) {

  const isDark = mode === "dark";

  const [days, setDays] = useState(7);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    const fetchChart = async () => {

      try {

        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: currencyName.toLowerCase(),
              days
            }
          }
        );

        setChartData(res.data.prices);

      } catch (err) {
        console.log(err);
      }

    };

    fetchChart();

  }, [coinId, days, currencyName]);

  if (!chartData.length) return <div>Loading chart...</div>;

  const data = dataFunction({chartData: chartData , isDark: isDark })

  const options = optionsFunction(isDark)

  return (
    <Box>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant={days === 7 ? "contained" : "outlined"} onClick={() => setDays(7)}>
          7D
        </Button>
        <Button variant={days === 30 ? "contained" : "outlined"} onClick={() => setDays(30)}>
          30D
        </Button>
        <Button variant={days === 365 ? "contained" : "outlined"} onClick={() => setDays(365)}>
          1Y
        </Button>
      </Stack>

      <Line data={data} options={options} />

    </Box>
  );
}