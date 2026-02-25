// IndexSection.jsx – only Altcoin Season + CMC 20 Index
import { Box, Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function IndexSection() {
  const items = [
    // Altcoin Season Index – gradient bar with dot
    {
      name: 'Altcoin Season Index',
      value: '35/100',
      label: 'Bitcoin Season',
      gaugeValue: 35,
      color: '#ff9800', // orange for BTC season
      type: 'bar',
      logo: 'https://cryptologos.cc/logos/altcoin-alt-logo.png?v=035',
    },
    // CoinMarketCap 20 Index – normal sparkline card
    {
      name: 'CoinMarketCap 20 Index',
      value: '$131.94',
      change: -1.06,
      isPositive: false,
      sparkline: [
        { v: 138 }, { v: 136 }, { v: 134 }, { v: 132.5 },
        { v: 131 }, { v: 130 }, { v: 132 }, { v: 131 },
        { v: 130.5 }, { v: 131.5 }, { v: 131.94 }
      ],
      type: 'sparkline',
      logo: 'https://cryptologos.cc/logos/coinmarketcap-cmc-logo.png?v=035',
    },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', py: 3, px: 2 }}>
      {items.map((item) => (
        <Card
          key={item.name}
          sx={{
            flex: '1 1 260px',
            maxWidth: 280,
            borderRadius: 3,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            bgcolor: 'background.paper',
            transition: 'all 0.2s',
            '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
          }}
        >
          <CardContent sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, height: 88 }}>
            {/* Left side */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.75 }}>
                <Box
                  component="img"
                  src={item.logo}
                  alt={item.name}
                  sx={{
                    width: 24,
                    height: 24,
                    mr: 1,
                    borderRadius: '50%',
                    objectFit: 'contain',
                  }}
                />
                <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ fontSize: '0.95rem' }}>
                  {item.name}
                </Typography>
              </Box>

              <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1.15rem', mb: 0.25 }}>
                {item.value}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: item.color || (item.isPositive ? 'success.main' : 'error.main'),
                  fontSize: '0.875rem',
                }}
              >
                {item.label || `${item.change > 0 ? '▲' : '▼'} ${Math.abs(item.change)}%`}
              </Typography>
            </Box>

            {/* Right side – gauge or sparkline */}
            <Box sx={{ width: 92, height: 48, flexShrink: 0, position: 'relative' }}>
              {item.type === 'bar' ? (
                // Gradient bar with dot for Altcoin Season
                <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(90deg, #ff9800 0%, #ffeb3b 50%, #42a5f5 100%)',
                      borderRadius: 10,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      left: `${item.gaugeValue}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 16,
                      height: 16,
                      bgcolor: 'background.paper',
                      border: '3px solid white',
                      borderRadius: '50%',
                      boxShadow: 2,
                    }}
                  />
                </Box>
              ) : (
                // Sparkline for CMC 20 Index
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={item.sparkline}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={item.isPositive ? '#16c784' : '#ea3943'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}