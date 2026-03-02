import { fetchSpotMarket, generateSparkline } from "../../../../../API/fectchSpotMartket";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  Box,
  TablePagination,
} from "@mui/material";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { useEffect, useState, useMemo } from "react";

export default function SpotTable({
  search = "",
  marketType = "All",
  currencySymbol = "$",
}) {
  const [spotMarkets, setSpotMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const rowsPerPage = 30;

  // FETCH DATA (SERVER SIDE PAGINATION)
  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      try {
        setLoading(true);

        const data = await fetchSpotMarket(
          "usd",
          page + 1,
          rowsPerPage
        );

        const enriched = data.map((row) => ({
          ...row,
          chart: generateSparkline(row.price),
        }));

        if (!mounted) return;

        setSpotMarkets(enriched);
        setError(null);
      } catch (err) {
        if (!mounted) return;
        setError("Failed to fetch spot market");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getData();
    const interval = setInterval(getData, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [page]);

  // Reset page when filters change
  useEffect(() => {
    setPage(0);
  }, [search, marketType]);

  // FILTERING (only affects current page results)
  const filtered = useMemo(() => {
    return spotMarkets.filter((row) => {
      const matchesSearch = row.pair
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        marketType === "All" || row.type === marketType;

      return matchesSearch && matchesType;
    });
  }, [spotMarkets, search, marketType]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  if (loading)
    return (
      <Box sx={{ py: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Typography color="error">{error}</Typography>;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pair</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>24h %</TableCell>
            <TableCell>Volume (24h)</TableCell>
            <TableCell>7d</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography sx={{ py: 4 }}>
                  No markets found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Typography fontWeight="bold">
                    {row.pair}
                  </Typography>
                  <Typography variant="caption">
                    {row.exchange}
                  </Typography>
                </TableCell>

                <TableCell>
                  {currencySymbol}
                  {row.price.toLocaleString(undefined, {
                    maximumFractionDigits: 6,
                  })}
                </TableCell>

                <TableCell
                  sx={{
                    color:
                      row.change >= 0
                        ? "success.main"
                        : "error.main",
                    fontWeight: 600,
                  }}
                >
                  {row.change >= 0 ? "+" : ""}
                  {row.change.toFixed(2)}%
                </TableCell>

                <TableCell>
                  {currencySymbol}
                  {row.volume.toLocaleString()}
                </TableCell>

                <TableCell width={120}>
                  <ResponsiveContainer width="100%" height={40}>
                    <LineChart data={row.chart}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#16c784"
                        dot={false}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[50]}
        component="div"
        count={1000} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </>
  );
}