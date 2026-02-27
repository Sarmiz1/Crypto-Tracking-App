import { useEffect, useRef, useState, useContext, useMemo } from "react";
import { Stack, Box } from "@mui/material";
import { appContext } from "../Context/AppContextProvider";
import { MetricCard } from "./MetricCards_Components/MetricCard";

export default function MetricCards() {
  const { globalMetrics, currency } = useContext(appContext);
  const isMobile = window.innerWidth < 900; // simple check

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const isLoading = !globalMetrics?.data?.data;

  /* =========================
    Metrics Memo
  ========================= */
  const metrics = useMemo(() => {
    if (isLoading) return [];
    const globalData = globalMetrics.data.data;

    return [
      {
        title: "Market Cap",
        value:
          globalData.total_market_cap?.[currency?.name?.toLowerCase?.()] || 0,
        change: globalData.market_cap_change_percentage_24h_usd || 0,
        data:
          globalMetrics.topCoins?.map(
            (c) => c.sparkline_in_7d?.price?.[0] || 0,
          ) || [],
      },
      {
        title: "Active Cryptos",
        value: globalData.active_cryptocurrencies || 0,
        change: 0,
        data: globalMetrics.topCoins?.map((c) => c.market_cap || 0) || [],
      },
      {
        title: "Fear & Greed",
        value: globalMetrics.fearGreed?.value || 0,
        change: 0,
        data: Array.from(
          { length: 7 },
          () =>
            (parseInt(globalMetrics.fearGreed?.value) || 0) +
            Math.random() * 5 -
            2,
        ),
      },
    ];
  }, [globalMetrics, currency, isLoading]);

  /* =========================
     Apple-style Drag on Desktop
  ========================= */
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider || isMobile) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - slider.offsetLeft);
      setScrollLeft(slider.scrollLeft);
    };
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mousemove", handleMouseMove);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, startX, scrollLeft, isMobile]);

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Stack
        ref={scrollRef}
        direction="row"
        spacing={3}
        sx={{
          overflowX: "auto",
          scrollBehavior: "smooth",
          cursor: isMobile ? "auto" : "grab",
          "&:active": { cursor: "grabbing" },
          "&::-webkit-scrollbar": { display: "none" },
          scrollSnapType: isMobile ? "x mandatory" : "none",
        }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  minWidth: 280,
                  height: 180,
                  bgcolor: "#ccc",
                  borderRadius: 2,
                }}
              />
            ))
          : metrics.map((metric, index) => (
              <Box
                key={index}
                sx={{
                  flex: "0 0 auto",
                  scrollSnapAlign: isMobile ? "start" : "none",
                }}
              >
                <MetricCard metric={metric} />
              </Box>
            ))}
      </Stack>
    </Box>
  );
}
