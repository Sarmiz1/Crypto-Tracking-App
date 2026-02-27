//  import {
//    Table,
//    TableBody,
//    TableCell,
//    TableContainer,
//    TableHead,
//    TableRow,
//    Paper,
//    Typography,
//    Stack,
//    Box,
//    IconButton
//  } from "@mui/material";
//  import StarBorderIcon from "@mui/icons-material/StarBorder";
//  import { useTheme } from "@mui/material/styles";
//  import {
//    LineChart,
//    Line,
//    ResponsiveContainer
//  } from "recharts";
//  import CustomTabPanel from "../../../Components/CustomTabPanel";
 
 
 export default function Exchanges({ value }) {
//    const theme = useTheme();
//    const isDark = theme.palette.mode === "dark";
 
//    const coins = [
//      {
//        rank: 1,
//        name: "Bitcoin",
//        symbol: "BTC",
//        price: 67903.32,
//        change24h: -0.13,
//        marketCap: "$1,357,550,467,871",
//        volume: "$47,071,745,849",
//        supply: "19.9M BTC",
//        chart: [10, 20, 18, 25, 22, 28, 26]
//      },
//      {
//        rank: 2,
//        name: "Ethereum",
//        symbol: "ETH",
//        price: 1965.09,
//        change24h: -0.10,
//        marketCap: "$237,171,690,401",
//        volume: "$21,397,607,899",
//        supply: "120.69M ETH",
//        chart: [15, 18, 17, 19, 16, 20, 18]
//      },
//      {
//        rank: 3,
//        name: "Tether",
//        symbol: "USDT",
//        price: 0.99,
//        change24h: 0.02,
//        marketCap: "$99,995,578,123",
//        volume: "$18,734,000,000",
//        supply: "83.7B USDT",
//        chart: [30, 25, 22, 18, 15, 12, 10]
//      }
//    ];
 
//    const stickyBg = theme.palette.background.paper;

// <TableContainer
//   component={Paper}
//   sx={{
//     maxHeight: 600,
//     overflow: "auto",
//     borderRadius: 3,
//     background: isDark
//       ? "rgba(255,255,255,0.05)"
//       : "rgba(0,0,0,0.03)",
//     backdropFilter: "blur(10px)"
//   }}
// >
//   <Table stickyHeader sx={{ minWidth: 1000 }}>
//     {/* ================= HEADER ================= */}
//     <TableHead>
//       <TableRow>
//         {/* Sticky # */}
//         <TableCell
//           sx={{
//             position: "sticky",
//             left: 0,
//             zIndex: 5,
//             backgroundColor: stickyBg,
//             width: 80,
//             boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
//           }}
//         >
//           #
//         </TableCell>

//         {/* Sticky Name */}
//         <TableCell
//           sx={{
//             position: "sticky",
//             left: 80,
//             zIndex: 5,
//             backgroundColor: stickyBg,
//             width: 220,
//             boxShadow: "2px 0 5px rgba(0,0,0,0.05)"
//           }}
//         >
//           Name
//         </TableCell>

//         <TableCell align="right">Price</TableCell>
//         <TableCell align="right">24h %</TableCell>
//         <TableCell align="right">Market Cap</TableCell>
//         <TableCell align="right">Volume</TableCell>
//         <TableCell align="right">Supply</TableCell>
//         <TableCell align="right">Last 7 Days</TableCell>
//       </TableRow>
//     </TableHead>

//     {/* ================= BODY ================= */}
//     <TableBody>
//       {coins.map((coin) => {
//         const isPositive = coin.change24h >= 0;

//         return (
//           <TableRow
//             key={coin.rank}
//             hover
//             sx={{
//               "&:hover": {
//                 backgroundColor: isDark
//                   ? "rgba(255,255,255,0.05)"
//                   : "rgba(0,0,0,0.04)"
//               }
//             }}
//           >
//             {/* Sticky Rank */}
//             <TableCell
//               sx={{
//                 position: "sticky",
//                 left: 0,
//                 backgroundColor: stickyBg,
//                 zIndex: 4,
//                 width: 80,
//                 boxShadow: "2px 0 5px rgba(0,0,0,0.05)"
//               }}
//             >
//               <Stack direction="row" alignItems="center" spacing={1}>
//                 <IconButton size="small">
//                   <StarBorderIcon fontSize="small" />
//                 </IconButton>
//                 {coin.rank}
//               </Stack>
//             </TableCell>

//             {/* Sticky Name */}
//             <TableCell
//               sx={{
//                 position: "sticky",
//                 left: 80,
//                 backgroundColor: stickyBg,
//                 zIndex: 4,
//                 width: 220,
//                 boxShadow: "2px 0 5px rgba(0,0,0,0.03)"
//               }}
//             >
//               <Stack direction="row" spacing={2} alignItems="center">
//                 <Box
//                   sx={{
//                     width: 32,
//                     height: 32,
//                     borderRadius: "50%",
//                     backgroundColor: "#f7931a"
//                   }}
//                 />
//                 <Box>
//                   <Typography>{coin.name}</Typography>
//                   <Typography
//                     variant="caption"
//                     color="text.secondary"
//                   >
//                     {coin.symbol}
//                   </Typography>
//                 </Box>
//               </Stack>
//             </TableCell>

//             <TableCell align="right">
//               ${coin.price.toLocaleString()}
//             </TableCell>

//             <TableCell
//               align="right"
//               sx={{
//                 color: isPositive
//                   ? "success.main"
//                   : "error.main"
//               }}
//             >
//               {isPositive ? "+" : ""}
//               {coin.change24h}%
//             </TableCell>

//             <TableCell align="right">
//               {coin.marketCap}
//             </TableCell>

//             <TableCell align="right">
//               {coin.volume}
//             </TableCell>

//             <TableCell align="right">
//               {coin.supply}
//             </TableCell>

//             <TableCell align="right">
//               <Box sx={{ height: 50, width: 120 }}>
//                 <ResponsiveContainer
//                   width="100%"
//                   height="100%"
//                 >
//                   <LineChart
//                     data={coin.chart.map((v) => ({
//                       value: v
//                     }))}
//                   >
//                     <Line
//                       type="monotone"
//                       dataKey="value"
//                       stroke={
//                         isPositive
//                           ? "#00c853"
//                           : "#d32f2f"
//                       }
//                       strokeWidth={2}
//                       dot={false}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </Box>
//             </TableCell>
//           </TableRow>
//         );
//       })}
//     </TableBody>
//   </Table>
// </TableContainer>)
 }



