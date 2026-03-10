import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextFieldSection } from "./SearchBarComponents/TextFieldSection";
import { SearchResults } from "./SearchBarComponents/SearchResults";
import { useContext } from "react";
import { appContext } from "../../Context/AppContextProvider";

export default function SearchBar({
  searchInput,
  setSearchInput,
}) {
  
  const { mode } = useContext(appContext)
  const isDark = mode === "dark";
  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  const handleOnClick = (coin) => {
    navigate(`/coin/${coin.id}`);
    setSearchInput('')
  }

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!searchInput) {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${searchInput}`
        );

        setResults(res.data.coins.slice(0, 6));
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [searchInput]);

  return (
    <Box sx={{ position: "relative", width: 300 }}>
      <TextFieldSection 
        isDark={isDark} 
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      {results.length > 0 && (
        <SearchResults 
          results={results}
          handleOnClick={handleOnClick}
        />
      )}
    </Box>
  );
}