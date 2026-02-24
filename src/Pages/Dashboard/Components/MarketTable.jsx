import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

export default function MarketTable() {
  const markets = [
    { name: "Bitcoin", price: "64,261", change: -0.85, volume: "28B" },
    { name: "Ethereum", price: "1,846", change: -1.02, volume: "15B" },
    { name: "BNB", price: "599", change: 1.95, volume: "3B" },
    { name: "Solana", price: "78", change: 0.17, volume: "2B" },
    { name: "XRP", price: "1.35", change: 1.05, volume: "1.5B" },
  ];

  return (
    <Paper sx={{ mt: 6, width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ overflowX: "auto", minWidth: 0 }}>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>24h %</TableCell>
              <TableCell>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {markets.map((coin) => (
              <TableRow key={coin.name}>
                <TableCell>{coin.name}</TableCell>
                <TableCell>${coin.price}</TableCell>
                <TableCell>{coin.change}%</TableCell>
                <TableCell>{coin.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}