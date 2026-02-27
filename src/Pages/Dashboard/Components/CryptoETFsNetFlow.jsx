import { Box, Typography, Tabs, Tab, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { useState } from 'react';

// Dummy data for different periods (replace with real API later)
const dummy30dData = [
  { date: '28 Jan', flow: -150, type: 'negative' },
  { date: '1 Feb', flow: 80, type: 'positive' },
  { date: '3 Feb', flow: -200, type: 'negative' },
  { date: '5 Feb', flow: 120, type: 'positive' },
  { date: '9 Feb', flow: -180, type: 'negative' },
  { date: '11 Feb', flow: 90, type: 'positive' },
  { date: '15 Feb', flow: -220, type: 'negative' },
  { date: '17 Feb', flow: 140, type: 'positive' },
  { date: '19 Feb', flow: -160, type: 'negative' },
  { date: '23 Feb', flow: 267, type: 'positive' },
];

const dummy1yData = [
  { date: 'Mar 25', flow: 200, type: 'positive' },
  { date: 'Jun 25', flow: -300, type: 'negative' },
  { date: 'Sep 25', flow: 150, type: 'positive' },
  { date: 'Dec 25', flow: -250, type: 'negative' },
  { date: 'Feb 26', flow: 267, type: 'positive' },
];

const dummyAllData = [
  { date: '2024', flow: 500, type: 'positive' },
  { date: '2025', flow: -400, type: 'negative' },
  { date: '2026', flow: 267, type: 'positive' },
];

export default function CryptoETFsNetFlow({ mode }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getChartData = () => {
    switch (tabValue) {
      case 0: return dummy30dData; // 30d
      case 1: return dummy1yData;  // 1y
      case 2: return dummyAllData; // All
      default: return dummy30dData;
    }
  };

  const chartData = getChartData();
  const latestFlow = chartData[chartData.length - 1]?.flow || 0;
  const isPositive = latestFlow >= 0;

  return (
    <Box 
      sx={{ 
        py: 4, 
        px: 2, 
        bgcolor: mode === 'dark' ? "#222222" : "background.default",
        borderRadius: 
        3, boxShadow: 1 , 
        mt: 4
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Crypto ETFs Net Flow
        </Typography>
        <Button variant="text" size="small" sx={{ textTransform: 'none', color: 'primary.main' }}>
          See More
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="30d" />
        <Tab label="1y" />
        <Tab label="All" />
      </Tabs>

      {/* Net Flow Value */}
      <Typography variant="h4" fontWeight={700} sx={{ color: isPositive ? 'success.main' : 'error.main', mb: 2 }}>
        {isPositive ? '+' : ''}${Math.abs(latestFlow).toLocaleString()} {chartData[chartData.length - 1]?.date || ''}
      </Typography>

      {/* Bar Chart */}
      <Box sx={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
            <XAxis dataKey="date" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={50} />
            <YAxis hide={true} />
            <Tooltip formatter={(value) => `$${Math.abs(value).toLocaleString()}`} />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="flow" name="Net Flow ($M)" barSize={20}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.flow >= 0 ? '#ff9800' : '#2196f3'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Bottom info line (static for now) */}
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Market Cap: $3.37T +5.60% | 24h Vol: $84.32B -4.23% | Dominance: BTC 57.9% ETH 10.4% | ETH Gas: 0.07 Gwei | Fear & Greed: 11/100 | Boost: 84.4 | Blue: 10/100
      </Typography>
    </Box>
  );
}