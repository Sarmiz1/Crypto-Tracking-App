import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

export default function MarketCard({ title, days, totalVol, dayVol, options, mode }) {
  return (
    <Card
      sx={{
        backgroundColor: mode === 'dark' ? "#1e1e1e" : "#fff",
        color: mode === 'dark' ? "#fff" : "#000",
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)"
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.6, mb: 2 }}>
          {days} • Vol {totalVol} • Today {dayVol}
        </Typography>

        {options.map((opt, i) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.5
              }}
            >
              <Typography variant="body2">{opt.name}</Typography>
              <Typography variant="body2">
                {opt.value}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={opt.value}
              sx={{
                height: 8,
                borderRadius: 5,
                transition: "all 1s ease-in-out"
              }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}