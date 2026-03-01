import { useEffect, useRef, useState, useContext, useMemo } from "react";
import { Stack, Box } from "@mui/material";
import { appContext } from "../Context/AppContextProvider";
import { MetricCard } from "./MetricCards_Components/MetricCard";

export default function MetricCards() {
  const { globalMetrics, currency } = useContext(appContext);

  // ------------------------
  // Track mobile/desktop dynamically
  // ------------------------
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // ------------------------
  // Loading check
  // ------------------------
  const isLoading = !globalMetrics?.data;

  // ------------------------
  // Metrics memo
  // ------------------------
  const metrics = useMemo(() => {
    if (isLoading) return [];
    const globalData = globalMetrics.data;

    return [
      {
        title: "Market Cap",
        value:
          globalData.total_market_cap?.[currency?.name?.toLowerCase?.()] || 0,
        change: globalData.market_cap_change_percentage_24h_usd || 0,
        data:
          globalMetrics.topCoins?.map(
            (c) => c.sparkline_in_7d?.price?.[0] || 0
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
        data: Array.from({ length: 7 }, () =>
          (parseInt(globalMetrics.fearGreed?.value) || 0) + Math.random() * 5 - 2
        ),
      },
    ];
  }, [globalMetrics, currency, isLoading]);

  // ------------------------
  // Dragging logic for desktop
  // ------------------------
  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider || isMobile) return;

    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      startXRef.current = e.pageX - slider.offsetLeft;
      scrollLeftRef.current = slider.scrollLeft;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseLeave = () => {
      isDraggingRef.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startXRef.current) * 1.5;
      slider.scrollLeft = scrollLeftRef.current - walk;
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
  }, [isMobile]); // reattach if isMobile changes

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