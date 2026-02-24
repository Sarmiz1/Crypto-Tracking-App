import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState, useEffect } from "react";

export default function IconButtons({ darkMode, scrollRef, type }) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);
    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <IconButton
      onClick={() => scroll(type === "left" ? "left" : "right")}
      disabled={type === "left" ? !canScrollLeft : !canScrollRight}
      sx={{
        position: "absolute",
        left: type === "left" ? -12 : "auto",
        right: type === "right" ? -12 : "auto",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        bgcolor: darkMode ? "#333" : "background.paper",
        boxShadow: 2,
        opacity: canScrollLeft ? 0.9 : 0.35,
        visibility:
          type === "left"
            ? canScrollLeft
              ? "visible"
              : "hidden"
            : canScrollRight
              ? "visible"
              : "hidden",
      }}
    >
      {type === "left" ? (
        <ChevronLeftIcon fontSize="small" />
      ) : (
        <ChevronRightIcon fontSize="small" />
      )}
    </IconButton>
  );
}
