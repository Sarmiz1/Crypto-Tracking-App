import { Box, Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { appContext } from "../../../../Context/AppContextProvider";


export default function CardContentBox({ scrollRef, setSelectedCoin }) {
  const { cryptoListing, currency } = useContext(appContext);

  const { symbol:currencySymbol } = currency || {};  

  const {
    data: coins,
    loading: coinsLoading,
    error: coinsError,
  } = cryptoListing || {};

  // ✅ Loading State
  if (coinsLoading) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Typography>Loading coins...</Typography>
      </Box>
    );
  }

  // ✅ Error State
  if (coinsError) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Typography color="error">
          Failed to load coins. Please try again.
        </Typography>
      </Box>
    );
  }

  // ✅ Safety fallback
  if (!coins || coins.length === 0) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Typography>No coins available.</Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={scrollRef}
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2.5,
        pb: 1.5,
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" },
        px: 2,
      }}
    >
      {/* ✅ Only first 11 coins */}
      {coins?.slice(0, 11).map((coin) => {
        const isPositive = coin.price_change_percentage_24h >= 0;

        return (
          <Card
            key={coin.id}
            onClick={() => setSelectedCoin(coin)}
            sx={{
              minWidth: 290,
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
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2.5,
              }}
            >
              {/* Left */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box
                    component="img"
                    src={coin.image}
                    alt={coin.name}
                    sx={{
                      width: 32,
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
                  {currencySymbol}
                  {coin.current_price?.toLocaleString()}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: isPositive ? "success.main" : "error.main",
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {isPositive ? "↑" : "↓"}{" "}
                  {Math.abs(coin.price_change_percentage_24h)?.toFixed(2)}%
                </Typography>

                <Box
                  sx={{
                    fontSize: "0.775rem",
                    color: "text.secondary",
                  }}
                >
                  <div>
                    Market Cap:{" "}
                    <strong>
                      {currencySymbol}
                      {coin.market_cap?.toLocaleString()}
                    </strong>
                  </div>
                  <div>
                    Vol 24h:{" "}
                    <strong>
                      {currencySymbol}
                      {coin.total_volume?.toLocaleString()}
                    </strong>
                  </div>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

