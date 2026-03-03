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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  const rowsPerPage = 30;

  // ✅ Debounce search (prevents jitter)
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

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

  const filtered = useMemo(() => {
    return spotMarkets.filter((row) => {
      const matchesSearch = row.pair
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());

      const matchesType =
        marketType === "All" || row.type === marketType;

      return matchesSearch && matchesType;
    });
  }, [spotMarkets, debouncedSearch, marketType]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ minHeight: 550 }}>
      {/* ✅ Mobile safe scroll */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table sx={{ minWidth: 750 }}>
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
            {error ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="error">
                    {error}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 && !loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography>
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

            {/* ✅ Loading row stays at bottom (no flash) */}
            {loading && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 2 }}>
                  <CircularProgress size={20} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      <TablePagination
        rowsPerPageOptions={[30]}
        component="div"
        count={-1} // server-side pagination safe
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
}