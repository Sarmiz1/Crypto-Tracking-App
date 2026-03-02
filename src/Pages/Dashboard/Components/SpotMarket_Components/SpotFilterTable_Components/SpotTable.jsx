import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  {
    pair: "BTC/USDT",
    exchange: "Binance",
    type: "CEX",
    price: 63120,
    change: 2.45,
    volume: 345000000,
    liquidity: 120000000,
    chart: [62000, 62200, 63000, 62800, 63120],
  },
  {
    pair: "ETH/USDT",
    exchange: "Coinbase",
    type: "CEX",
    price: 3450,
    change: -1.12,
    volume: 210000000,
    liquidity: 80000000,
    chart: [3500, 3480, 3470, 3460, 3450],
  },
  {
    pair: "SOL/USDT",
    exchange: "Uniswap",
    type: "DEX",
    price: 132,
    change: 4.21,
    volume: 89000000,
    liquidity: 40000000,
    chart: [120, 125, 128, 130, 132],
  },
];

export default function SpotTable({ search, marketType, darkMode }) {
  const filtered = mockData.filter((row) => {
    const matchesSearch = row.pair
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      marketType === "All" || row.type === marketType;

    return matchesSearch && matchesType;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Pair</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>24h %</TableCell>
          <TableCell>Volume (24h)</TableCell>
          <TableCell>Liquidity</TableCell>
          <TableCell>7d</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {filtered.map((row, i) => (
          <TableRow key={i}>
            <TableCell>
              <Typography fontWeight="bold">
                {row.pair}
              </Typography>
              <Typography variant="caption">
                {row.exchange}
              </Typography>
            </TableCell>

            <TableCell>
              ${row.price.toLocaleString()}
            </TableCell>

            <TableCell
              sx={{
                color: row.change > 0 ? "green" : "red",
                fontWeight: 600,
              }}
            >
              {row.change > 0 ? "+" : ""}
              {row.change}%
            </TableCell>

            <TableCell>
              ${row.volume.toLocaleString()}
            </TableCell>

            <TableCell>
              ${row.liquidity.toLocaleString()}
            </TableCell>

            <TableCell width={120}>
              <ResponsiveContainer width="100%" height={40}>
                <LineChart
                  data={row.chart.map((v) => ({ value: v }))}
                >
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      row.change > 0 ? "#16c784" : "#ea3943"
                    }
                    dot={false}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}