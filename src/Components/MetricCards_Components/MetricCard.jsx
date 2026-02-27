import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { CountUp } from "./CountUp";

export function MetricCard({ metric }) {
  const theme = useTheme();
  const isPositive = metric.change >= 0;

  return (
    <Card
      sx={{
        minWidth: 280,
        p: 3,
        borderRadius: 4,
        transition: "all 0.4s ease",
        "&:hover": { transform: "translateY(-6px) scale(1.02)" },
        background: theme.palette.mode === "dark"
          ? "rgba(255,255,255,0.05)"
          : "rgba(0,0,0,0.05)",
        backdropFilter: "blur(12px)",
        border: theme.palette.mode === "dark"
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(0,0,0,0.1)"
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {metric.title}
      </Typography>

      <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
        <CountUp value={metric.value} />
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color: isPositive
            ? theme.palette.success.main
            : theme.palette.error.main
        }}
      >
        {isPositive ? "+" : ""}
        {metric.change?.toFixed(2)}%
      </Typography>

      <Box sx={{ height: 70, mt: 3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metric.data.map((v) => ({ value: v }))}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={
                isPositive
                  ? theme.palette.success.main
                  : theme.palette.error.main
              }
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
