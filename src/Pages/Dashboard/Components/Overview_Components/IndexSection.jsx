import { useRef } from "react";
import { Box, Container } from "@mui/material";
import ContentCardsBox from "././IndexSection_Components/ContentCardsBox";
import IndexIconsButton from "././IndexSection_Components/IndexIconsButton";

export default function IndexSection() {
  const scrollRef = useRef(null);


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
        <ContentCardsBox scrollRef={scrollRef} />

        {/* RIGHT ARROW */}
        <IndexIconsButton scrollRef={scrollRef} type="right" />
      </Box>
    </Container>
  );
}
