import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";


export default function SearchBar() {

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return(
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: isDark ? 
          '#FFFF' :
          "background.paper",
        borderRadius: 1,
        p: "2px 8px",
        boxShadow: 1,
        width: 300,
        ml: 1
      }}
    >
      <SearchIcon sx={{ mr: 1, color: "black" }} />
      <TextField
        placeholder="Search..."
        variant="standard"
        slotProps={{ input: { disableUnderline: true } }}
        fullWidth
        sx={{
          display: {
            xs: "block",
          },
          input: { 
            color: isDark ? 
            '#000000' : 'FFFF' 
          }
        }}
      />
    </Box>
  )
}