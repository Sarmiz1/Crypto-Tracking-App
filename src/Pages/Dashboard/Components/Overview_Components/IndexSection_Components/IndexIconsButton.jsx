import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect, useCallback } from "react";

export default function IndexIconsButton({ type, scrollRef }) {
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    // small tolerance to avoid float issues
    setCanLeft(scrollLeft > 1);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateButtons(); // run on mount

    el.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = el.clientWidth * 0.85;

    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });

    // re-check after scroll animation
    setTimeout(updateButtons, 350);
  };

  const isLeft = type === "left";
  const visible = isLeft ? canLeft : canRight;

  return (
    <IconButton
      onClick={() => scroll(type)}
      disabled={!visible}
      sx={{
        position: "absolute",
        left: isLeft ? 8 : "auto",
        right: !isLeft ? 8 : "auto",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 5,
        bgcolor: "background.paper",
        boxShadow: 3,
        transition: "all 0.2s ease",
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
        "&:hover": {
          transform: "translateY(-50%) scale(1.08)",
        },
      }}
    >
      {isLeft ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </IconButton>
  );
}