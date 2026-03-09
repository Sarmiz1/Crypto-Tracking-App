import { Box, useTheme, useMediaQuery } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const COLORS = ["#f7931a", "#627eea", "#e0e0e0"]; // BTC, ETH, Other

export const Breakdown = ({ btcDominance, ethDominance }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Safe numeric conversion
  const safeNum = (val) =>
    typeof val === "number" && !isNaN(val) ? val : 0;

  const btc = safeNum(btcDominance);
  const eth = safeNum(ethDominance);
  const other = Math.max(0, 100 - btc - eth);

  const breakdownData = [
    { name: "BTC", value: btc },
    { name: "ETH", value: eth },
    { name: "Other", value: other },
  ];

  // Remove empty slices
  const filteredData = breakdownData.filter((item) => item.value > 0);

  return (
    <Box sx={{ width: "100%", height: 250, mb: 2 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            label={
              !isMobile
                ? (entry) => {
                    const val =
                      typeof entry.value === "number" && !isNaN(entry.value)
                        ? entry.value.toFixed(1)
                        : "0.0";
                    return `${entry.name} ${val}%`;
                  }
                : false
            }
            isAnimationActive
            animationDuration={800}
            animationEasing="ease-out"
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

            {/* Mobile center label */}
            {isMobile && (
              <Label
                value="100%"
                position="center"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  fill: "#888",
                }}
              />
            )}
          </Pie>

          <Tooltip
            formatter={(value) => {
              const val =
                typeof value === "number" && !isNaN(value)
                  ? `${value.toFixed(1)}%`
                  : "N/A";
              return val;
            }}
          />

          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};