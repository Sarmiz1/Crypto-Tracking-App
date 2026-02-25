import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";

export default function IndexIconsButton({ type, scrollRef }) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 5);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateButtons();
    el.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.85;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <IconButton
      onClick={() => scroll(type)}
      sx={{
        position: "absolute",
        left: type === "left" ? 8 : "auto",
        right: type === "right" ? 8 : "auto",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 5,
        bgcolor: "background.paper",
        boxShadow: 2,
        opacity: type === "left" ? (canLeft ? 1 : 0) : canRight ? 1 : 0,
        pointerEvents:
          type === "left"
            ? canLeft
              ? "auto"
              : "none"
            : canRight
              ? "auto"
              : "none",
        transition: "opacity 0.3s",
      }}
    >
      {type === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  );
}
