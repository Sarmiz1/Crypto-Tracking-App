import { useTheme } from "@mui/material/styles";
import  Box  from "@mui/material/Box";
import TextContainer from "./SubscribeSection_Components/TextContainer";
import FormContainer from "./SubscribeSection_Components/FormContainer";


export default function SubscribeSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  
  return (
    <Box
      sx={{
        backgroundColor: isDark ? "#121212" : "#f5f5f5",
        padding: { xs: "20px", md: "40px" },
        borderRadius: 2,
        color: isDark ? "#fff" : "#000",
        mt: 4,
      }}
    >
      {/* ========================
          MAIN CONTAINER (RESPONSIVE FLEX)
      ======================== */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          gap: { xs: 3, md: 5 },
        }}
      >
        {/* ========================
            7b️⃣ IMAGE
        ======================== */}
        <Box
          component="img"
          src="btc-bank.png"
          alt="Crypto illustration"
          sx={{
            width: { xs: "100%", md: 400 }, // slightly wider on desktop
            maxWidth: "100%",
            order: { xs: 0, md: 1 },
            alignSelf: { xs: "center", md: "flex-end" },
            mb: { xs: 3, md: 0 },
            filter: isDark
              ? "brightness(0.8) saturate(0.9)"
              : "brightness(0.9) saturate(0.9)", // subtle blend
          }}
        />

        {/* ========================
              TEXT + FORM CONTAINER
        ======================== */}
        <Box sx={{ flex: 1, order: { xs: 1, md: 0 } }}>
          <TextContainer />
          <FormContainer />
        </Box>
      </Box>
    </Box>
  );
}