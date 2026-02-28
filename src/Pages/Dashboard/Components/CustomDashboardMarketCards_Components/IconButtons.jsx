import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState, useEffect, useCallback } from "react";

export default function IconButtons({ darkMode, scrollRef, type }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScroll(); // run once on mount

    el.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);

    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.75;

    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const isLeft = type === "left";
  const isDisabled = isLeft ? !canScrollLeft : !canScrollRight;
  const isVisible = isLeft ? canScrollLeft : canScrollRight;

  return (
    <IconButton
      onClick={() => scroll(isLeft ? "left" : "right")}
      disabled={isDisabled}
      sx={{
        position: "absolute",
        left: isLeft ? -12 : "auto",
        right: !isLeft ? -12 : "auto",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        bgcolor: darkMode ? "#333" : "background.paper",
        boxShadow: 3,
        transition: "all 0.2s ease",
        opacity: isVisible ? 0.9 : 0,
        visibility: isVisible ? "visible" : "hidden",
        "&:hover": {
          opacity: 1,
          transform: "translateY(-50%) scale(1.05)",
        },
      }}
    >
      {isLeft ? (
        <ChevronLeftIcon fontSize="small" />
      ) : (
        <ChevronRightIcon fontSize="small" />
      )}
    </IconButton>
  );
}