import { useState, useContext } from "react";
import { Box, Typography } from "@mui/material";
import CustomTextBox from "../../../Components/CustomTextBox";
import { textFile } from "../../../Data/text";
import { appContext } from "../../../Context/AppContextProvider";
import ChangeIndicator from "./InfoSection_Components/ChangeIndicator";
import CollapseSection from "./InfoSection_Components/CollapseSection";
import ToggleSection from "./InfoSection_Components/ToggleSection";
import { useMarketInfo } from "../../../utils/useMarketInfo";

export default function InfoSection() {
  const { mode } = useContext(appContext);
  const { marketCap, marketCapChange } = useMarketInfo() 


  // ------------------------
  // Hide component if no data
  // ------------------------
  if (!marketCap && !marketCapChange) return null;

  const isDark = mode === "dark";
  const textColor = isDark ? "#fff" : "#000";

  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: isDark ? "#343231" : "#FAF9F6",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: textColor }}>
          Today's Cryptocurrency Prices by Market Cap
        </Typography>

        <Typography sx={{ color: textColor }}>
          The global crypto market cap is {marketCap},{" "}
          <ChangeIndicator value={marketCapChange} /> increase over the last day.
        </Typography>

        {/* Collapse Section */}
        <CollapseSection textColor={textColor} expanded={expanded} />

        {/* Toggle */}
        <ToggleSection
          textColor={textColor}
          setExpanded={setExpanded}
          expanded={expanded}
        />
      </Box>

      <CustomTextBox text={textFile} />
    </Box>
  );
}