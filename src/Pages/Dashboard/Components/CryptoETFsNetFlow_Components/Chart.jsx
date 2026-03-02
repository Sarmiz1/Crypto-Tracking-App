import { Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  ReferenceLine,
} from "recharts";

export default function Chart({ chartData }) {
  return (
    <Box sx={{ height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
        >
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis hide />
          <Tooltip
            formatter={(value) =>
              `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString()}M`
            }
          />
          <Legend verticalAlign="top" height={36} />

          <ReferenceLine y={0} stroke="#999" />

          <Bar dataKey="flow" name="Net Flow ($M)" barSize={18}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.flow >= 0
                    ? "#4caf50" // green inflow
                    : "#ef5350" // red outflow
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
