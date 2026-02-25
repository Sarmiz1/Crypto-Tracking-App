import { useRef } from "react";
import { Box, Container } from "@mui/material";
import ContentCardsBox from "./IndexSection_Components/ContentCardsBox";
import IndexIconsButton from "./IndexSection_Components/IndexIconsButton";

export default function Dashboard() {
  const scrollRef = useRef(null);

  const items = [
    {
      name: "Fear and Greed Index",
      value: "72",
      label: "Greed",
      gaugeValue: 72,
      type: "fear",
    },
    {
      name: "Altcoin Season Index",
      value: "32/100",
      gaugeValue: 32,
      type: "season",
    },
    {
      name: "CoinMarketCap 20 Index",
      value: "$132.6",
      change: -1.43,
      isPositive: false,
      sparkline: [
        { v: 138 },
        { v: 136 },
        { v: 134 },
        { v: 132 },
        { v: 131 },
        { v: 130 },
        { v: 132 },
        { v: 131 },
        { v: 130.5 },
        { v: 131.5 },
        { v: 132.6 },
      ],
      type: "sparkline",
    },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1500px",
        mx: "auto",
        px: 2,
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          py: 4,
        }}
      >
        {/* LEFT ARROW */}
        <IndexIconsButton scrollRef={scrollRef} type="left" />

        {/* SCROLL STRIP */}
        <ContentCardsBox items={items} scrollRef={scrollRef} />

        {/* RIGHT ARROW */}
        <IndexIconsButton scrollRef={scrollRef} type="right" />
      </Box>
    </Container>
  );
}
