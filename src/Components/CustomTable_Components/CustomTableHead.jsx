import { TableCell, TableHead, TableRow } from "@mui/material";

export default function CustomTableHead({ stickyBg }) {
  return (
    <TableHead>
      <TableRow>
        {/* Sticky Rank Column */}
        <TableCell
          sx={{
            position: "sticky",
            left: 0,
            zIndex: 5,
            backgroundColor: stickyBg,
            width: { xs: 40, sm: 60, md: 80 },
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          }}
        >
          #
        </TableCell>

        {/* Sticky Name Column */}
        <TableCell
          sx={{
            position: "sticky",
            left: { xs: 40, sm: 60, md: 80 }, // match # column width
            zIndex: 5,
            backgroundColor: stickyBg,
            width: { xs: 120, sm: 160, md: 220 },
            boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
          }}
        >
          Name
        </TableCell>

        <TableCell align="right">Price</TableCell>
        <TableCell align="right">24h %</TableCell>
        <TableCell align="right">Market Cap</TableCell>
        <TableCell align="right">Volume</TableCell>
        <TableCell align="right">Supply</TableCell>
        <TableCell align="right">Last 7 Days</TableCell>
      </TableRow>
    </TableHead>
  );
}