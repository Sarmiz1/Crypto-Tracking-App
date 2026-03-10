import { TextField, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


export const TextFieldSection = ({ isDark, searchInput, setSearchInput }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: isDark ? "#fff" : "background.paper",
        borderRadius: 1,
        p: "2px 8px",
        boxShadow: 1,
      }}
    >
      <SearchIcon sx={{ mr: 1, color: "black", cursor: "pointer" }} />

      <TextField
        placeholder="Search..."
        variant="standard"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        slotProps={{ input: { disableUnderline: true } }}
        fullWidth
        sx={{
          input: {
            color: isDark ? "#000" : "#fff",
          },
        }}
      />
    </Box>
  );
};
