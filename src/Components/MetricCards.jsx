import { useEffect, useRef, useState } from "react";
import { Stack, Card, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

function CountUp({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value.replace(/[^0-9.]/g, ""));
    const duration = 1000;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplay(end);
        clearInterval(counter);
      } else {
        setDisplay(start);
      }
    }, 16);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <>
      {value.includes("$")
        ? `$${display.toFixed(2)}`
        : display.toFixed(0)}
    </>
  );
}

export default function MetricCards() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const metrics = [
    {
      title: "Market Cap",
      value: "$2.32",
      suffix: "T",
      change: -1.65,
      data: [10, 20, 18, 25, 22, 28, 26]
    },
    {
      title: "CMC20",
      value: "$139.56",
      suffix: "",
      change: -1.39,
      data: [15, 18, 17, 19, 16, 20, 18]
    },
    {
      title: "Fear & Greed",
      value: "12",
      suffix: "",
      change: 2,
      data: [30, 25, 22, 18, 15, 12, 10]
    }
  ];

  // Smooth infinite scroll
  useEffect(() => {
    const container = scrollRef.current;
    let animationFrame;

    const scroll = () => {
      if (!isHovered && container) {
        container.scrollLeft += 0.5;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Stack
        direction="row"
        spacing={3}
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          overflowX: "auto",
          pb: 3,
          "&::-webkit-scrollbar": { display: "none" }
        }}
      >
        {[...metrics, ...metrics].map((metric, index) => {
          const isPositive = metric.change >= 0;

          return (
            <Card
              key={index}
              sx={{
                minWidth: 280,
                p: 3,
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                transition: "all 0.4s ease",

                background: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.05)",

                backdropFilter: "blur(12px)",

                border: isDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: "-2px",
                  borderRadius: "inherit",
                  background:
                    "linear-gradient(270deg, #00f5ff, #7b00ff, #00f5ff)",
                  backgroundSize: "400% 400%",
                  animation: "borderMove 6s linear infinite",
                  zIndex: -1
                },

                boxShadow: isDark
                  ? "0 0 25px rgba(0,255,170,0.2)"
                  : "0 0 20px rgba(0,0,0,0.1)",

                "&:hover": {
                  transform: "translateY(-8px) scale(1.03)",
                  boxShadow: isDark
                    ? "0 0 45px rgba(0,255,170,0.5)"
                    : "0 0 35px rgba(0,0,0,0.2)"
                },

                "@keyframes borderMove": {
                  "0%": { backgroundPosition: "0% 50%" },
                  "100%": { backgroundPosition: "400% 50%" }
                }
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                {metric.title}
              </Typography>

              <Typography
                variant="h5"
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                <CountUp value={metric.value} />
                {metric.suffix}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  color: isPositive
                    ? isDark
                      ? "#00ff99"
                      : "#009966"
                    : isDark
                    ? "#ff4d4f"
                    : "#cc0000"
                }}
              >
                {isPositive ? "+" : ""}
                {metric.change}%
              </Typography>

              <Box sx={{ height: 70, mt: 3 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={metric.data.map((v) => ({
                      value: v
                    }))}
                  >
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={
                        isPositive
                          ? isDark
                            ? "#00ff99"
                            : "#009966"
                          : isDark
                          ? "#ff4d4f"
                          : "#cc0000"
                      }
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}