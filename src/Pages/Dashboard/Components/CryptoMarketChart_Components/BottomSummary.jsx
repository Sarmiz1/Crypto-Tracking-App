import { Box, Typography, Stack } from "@mui/material";

export default function BottomSummary({ summaryData }) {
  return (
    <Stack direction="row" spacing={3} flexWrap="wrap" useFlexGap>
      {summaryData.map((item, index) => (
        <Box key={index}>
          <Typography variant="caption" color="text.secondary">
            {item.label}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: item.label === "Fear & Greed" && item.fearGreedColor,
            }}
            color={
              item.change?.includes("-")
                ? "error.main"
                : item.change?.includes("+")
                  ? "success.main"
                  : "text.primary"
            }
          >
            {item.value} {item.change && ` ${item.change}`}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

{
  /* <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        Market Cap: $3.37T +5.60% | 24h Vol: $84.32B -4.23% | Dominance: BTC 57.9% ETH 10.4% | ETH Gas: 0.07 Gwei | Fear & Greed: 11/100 | Boom: 84.4 | Blue: 10/100 | Get Related...
      </Typography> */
}
