import { Box, Tabs, Tab, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';

// Dummy data for different tabs (expand with real API later)
// Overview: Market Cap + Volume
const dummyOverviewData = [
  { date: '27 Jan', marketCap: 2.3, volume: 100 },
  { date: '28 Jan', marketCap: 2.28, volume: 98 },
  { date: '29 Jan', marketCap: 2.26, volume: 96 },
  { date: '30 Jan', marketCap: 2.25, volume: 95 },
  { date: '31 Jan', marketCap: 2.24, volume: 94 },
  { date: '1 Feb', marketCap: 2.23, volume: 93 },
  { date: '2 Feb', marketCap: 2.22, volume: 92 },
  { date: '3 Feb', marketCap: 2.21, volume: 91 },
  { date: '4 Feb', marketCap: 2.2, volume: 90 },
  { date: '5 Feb', marketCap: 2.19, volume: 89 },
  { date: '6 Feb', marketCap: 2.18, volume: 88 },
  { date: '7 Feb', marketCap: 2.17, volume: 87 },
  { date: '8 Feb', marketCap: 2.16, volume: 86 },
  { date: '9 Feb', marketCap: 2.15, volume: 85 },
  { date: '10 Feb', marketCap: 2.14, volume: 84 },
  { date: '11 Feb', marketCap: 2.13, volume: 83 },
  { date: '12 Feb', marketCap: 2.12, volume: 82 },
  { date: '13 Feb', marketCap: 2.11, volume: 81 },
  { date: '14 Feb', marketCap: 2.1, volume: 80 },
  { date: '15 Feb', marketCap: 2.09, volume: 79 },
  { date: '16 Feb', marketCap: 2.08, volume: 78 },
  { date: '17 Feb', marketCap: 2.07, volume: 77 },
  { date: '18 Feb', marketCap: 2.06, volume: 76 },
  { date: '19 Feb', marketCap: 2.05, volume: 75 },
  { date: '20 Feb', marketCap: 2.04, volume: 74 },
  { date: '21 Feb', marketCap: 2.03, volume: 73 },
  { date: '22 Feb', marketCap: 2.02, volume: 72 },
  { date: '23 Feb', marketCap: 2.01, volume: 71 },
  { date: '24 Feb', marketCap: 2.0, volume: 70 },
];

// Breakdown: Pie chart dummy data (dominance breakdown)
const dummyBreakdownData = [
  { name: 'BTC', value: 57.9 },
  { name: 'ETH', value: 10.4 },
  { name: 'Other', value: 31.7 },
];

const COLORS = ['#f7931a', '#627eea', '#e0e0e0'];

// 30d: Shorter dummy data for 30 days
const dummy30dData = dummyOverviewData.slice(-30);

// 1y: Dummy data for 1 year (365 days, simplified)
const dummy1yData = dummyOverviewData.slice(0, 365).map((d, i) => ({ ...d, date: `Day ${i + 1}` })); // Expand as needed

// All: Longer dummy data for all time (e.g. 5 years, simplified)
const dummyAllData = dummyOverviewData.slice(0, 1825).map((d, i) => ({ ...d, date: `Day ${i + 1}` })); // Expand as needed

export default function CryptoMarketCapChart() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getChartContent = () => {
    let chartData = dummyOverviewData;
    let isPie = false;

    switch (tabValue) {
      case 1: // Breakdown
        isPie = true;
        break;
      case 2: // 30d
        chartData = dummy30dData;
        break;
      case 3: // 1y
        chartData = dummy1yData;
        break;
      case 4: // All
        chartData = dummyAllData;
        break;
      default: // Overview
        chartData = dummyOverviewData;
        break;
    }

    if (isPie) {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dummyBreakdownData}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {dummyBreakdownData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
          <YAxis hide={true} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="marketCap" stroke="#4caf50" strokeWidth={2} dot={false} name="Market Cap (T)" />
          <Line type="monotone" dataKey="volume" stroke="#ef5350" strokeWidth={2} dot={false} name="Volume (B)" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Box sx={{ py: 4, px: 2, bgcolor: 'background.default', borderRadius: 3, boxShadow: 1 }}>
      {/* Title */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Crypto Market Cap
      </Typography>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Overview" />
        <Tab label="Breakdown" />
        <Tab label="30d" />
        <Tab label="1y" />
        <Tab label="All" />
      </Tabs>

      {/* Market Cap & Volume labels (shown in Overview only) */}
      {tabValue === 0 && (
        <Box sx={{ display: 'flex', gap: 3, mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Market Cap
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              $2.29T
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Volume
            </Typography>
            <Typography variant="h5" fontWeight={700}>
              $94.08B
            </Typography>
          </Box>
        </Box>
      )}

      {/* Chart Area */}
      <Box sx={{ height: 220, mb: 2 }}>
        {getChartContent()}
      </Box>

      {/* Bottom summary */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Market Cap: $3.37T +5.60% | 24h Vol: $84.32B -4.23% | Dominance: BTC 57.9% ETH 10.4% | ETH Gas: 0.07 Gwei | Fear & Greed: 11/100 | Boom: 84.4 | Blue: 10/100 | Get Related...
      </Typography>
    </Box>
  );
}