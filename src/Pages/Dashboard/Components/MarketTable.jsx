import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import { useContext } from "react";
import { appContext } from "../../../Context/AppContextProvider";
import { formatLargeDigits } from "../../../utils/formatLargeDigits";
import currencyFormat from "../../../utils/currencyFormat";
import ErrorDisplay from "../../../Components/ErrorDisplay";
import LoadingState from "../../../Components/LoadingState";

export default function MarketTable() {
  const { cryptoListing, currency } = useContext(appContext);
  const { symbol: currencySymbol } = currency || {};
  const { data, loading, error } = cryptoListing || {};
  const markets = data?.slice(12, 35).map((coin) => ({
    id: coin.id,
    price: coin.current_price,
    name: coin.name,
    image: coin.image,
    volume: coin.total_volume,
    symbol: coin.symbol,
    changePercent_24: coin.price_change_percentage_24h,
  }));

  if (loading) return <LoadingState />

  if (error)
    return (
      <ErrorDisplay message={'Failed to load market: Try again'}/>
    );

    

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
              <TableRow key={coin.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      component={"img"}
                      src={coin.image}
                      sx={{
                        width: "25px",
                      }}
                    />
                    {coin.name}
                  </Box>
                </TableCell>
                <TableCell>
                  {currencyFormat(coin.price, { symbol: currencySymbol })}
                </TableCell>
                <TableCell>
                  {formatLargeDigits(coin.changePercent_24, "")}%
                </TableCell>
                <TableCell>{formatLargeDigits(coin.volume, "")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
