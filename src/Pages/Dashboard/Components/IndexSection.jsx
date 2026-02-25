import { useRef, useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const items = [
    {
      name: "Fear and Greed Index",
      value: "72",
      label: "Greed",
      gaugeValue: 72,
      type: "fear",
    },
    {
      name: "Altcoin Season Index",
      value: "32/100",
      gaugeValue: 32,
      type: "season",
    },
    {
      name: "CoinMarketCap 20 Index",
      value: "$132.6",
      change: -1.43,
      isPositive: false,
      sparkline: [
        { v: 138 }, { v: 136 }, { v: 134 }, { v: 132 },
        { v: 131 }, { v: 130 }, { v: 132 }, { v: 131 },
        { v: 130.5 }, { v: 131.5 }, { v: 132.6 }
      ],
      type: "sparkline",
    },
  ];

  const updateButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateButtons();
    el.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.85;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1500px",
        mx: "auto",
        px: 2,
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          py: 4,
        }}
      >
        {/* LEFT ARROW */}
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            bgcolor: "background.paper",
            boxShadow: 2,
            opacity: canLeft ? 1 : 0,
            pointerEvents: canLeft ? "auto" : "none",
            transition: "opacity 0.3s",
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* SCROLL STRIP */}
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
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  {item.name}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mb: 2 }}
                >
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
                          stroke={
                            item.isPositive
                              ? "#16c784"
                              : "#ea3943"
                          }
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

        {/* RIGHT ARROW */}
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            bgcolor: "background.paper",
            boxShadow: 2,
            opacity: canRight ? 1 : 0,
            pointerEvents: canRight ? "auto" : "none",
            transition: "opacity 0.3s",
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </Container>
  );
}