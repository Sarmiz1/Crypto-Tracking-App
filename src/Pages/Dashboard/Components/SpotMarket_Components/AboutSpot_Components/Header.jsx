import { Box, Typography } from "@mui/material"
export const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mb: 3,
        minWidth: 0,
      }}
    >
      <Typography variant="h4" sx={{fontWeight: 500}}>
        About Spot Market
      </Typography>
    </Box>
  )
}