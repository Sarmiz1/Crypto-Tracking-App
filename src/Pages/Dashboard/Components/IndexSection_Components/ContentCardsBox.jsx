import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function ContentCardsBox({ items, scrollRef }) {
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
      {items.map((item) => (
        <Card
          key={item.name}
          sx={{
            minWidth: 380, // 🔥 more width
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

            {/* Fear & Greed Bar */}
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

            {/* Altcoin Season */}
            {item.type === "season" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "text.secondary",
                    mb: 0.5,
                  }}
                >
                  <span>Bitcoin Season</span>
                  <span>Altcoin Season</span>
                </Box>

                <Box
                  sx={{
                    position: "relative",
                    height: 10,
                    borderRadius: 6,
                    background:
                      "linear-gradient(90deg, #f7931a 0%, #f7931a 40%, #90caf9 60%, #1e88e5 100%)",
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
              </>
            )}

            {/* Sparkline */}
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
