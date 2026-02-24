import Box from "@mui/material/Box";

export default function CustomTabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        // Removed horizontal padding + added overflow hidden as safety
        <Box sx={{ py: 3, px: 0, overflowX: "hidden" }}>
          {children}
        </Box>
      )}
    </div>
  );
}