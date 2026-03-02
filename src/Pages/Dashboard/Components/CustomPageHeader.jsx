import { Typography, Box } from "@mui/material";

export default function CustomPageHeader({ darkMode, header='No header', children='No message Body' }, ...props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        mb: 3,
        mt: -2,
        gap: 1,
        minWidth: 0,
        ...props
      }}
    >
      <Typography variant="h4" fontWeight="bold" props>
        {header}
      </Typography>
      <Typography variant="body1" color={darkMode ? "grey.400" : "grey.600"}>
        {children}
      </Typography>
    </Box>
  );
}