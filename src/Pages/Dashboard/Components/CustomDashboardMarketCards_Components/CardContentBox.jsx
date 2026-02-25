import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function CardContentBox({ coins, scrollRef, setSelectedCoin }) {
  return (
    <Box
      ref={scrollRef}
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2.5,                      // a bit more gap between cards
        pb: 1.5,
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" },
        px: 2,
      }}
    >
      {coins.map((coin) => {
        const isPositive = coin.change >= 0;

        return (
          <Card
            key={coin.name}
            onClick={() => setSelectedCoin(coin)}
            sx={{
              minWidth: 290,               // slightly wider to avoid squeezing
              flex: "0 0 auto",
              borderRadius: 3,
              boxShadow: 1,
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
              bgcolor: "background.paper",
            }}
          >
            <CardContent
              sx={{
                p: 2,                      // back to comfortable padding
                display: "flex",
                alignItems: "center",
                gap: 2.5,                  // more space between left info and chart
              }}
            >
              {/* Left side – info */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box
                    component="img"
                    src={coin.logo}
                    alt={coin.name}
                    sx={{
                      width: 32,           // better visible size
                      height: 32,
                      mr: 1.5,
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                  <Typography variant="subtitle1" fontWeight={600} noWrap>
                    {coin.name}
                  </Typography>
                </Box>

                <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
                  ${coin.price}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: isPositive ? "success.main" : "error.main",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  {isPositive ? "↑" : "↓"} {Math.abs(coin.change)}%
                </Typography>

                <Box
                  sx={{
                    fontSize: "0.775rem",   // balanced small text
                    color: "text.secondary",
                    lineHeight: 1.3,
                  }}
                >
                  <div>Market Cap: <strong>{coin.marketCap}</strong></div>
                  <div>Vol 24h: <strong>{coin.volume24h}</strong></div>
                </Box>
              </Box>

              {/* Right side – small chart */}
              <Box sx={{ width: 110, height: 60, flexShrink: 0 }}> {/* 60px gives room without excess height */}
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={coin.sparkline}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={isPositive ? "#16c784" : "#ea3943"}
                      strokeWidth={2.2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}