import {
  Table,
  TableContainer,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRef, useState, useEffect } from "react";

import CustomTableHead from "./CustomTable_Components/CustomTableHead";
import CustomTableBody from "./CustomTable_Components/CustomTableBody";

export default function CustomTable({ coins, currency, section }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const stickyBg = theme.palette.background.paper;

  const containerRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

  // Update arrow visibility based on scroll position
  const updateScrollState = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    setCanScrollUp(scrollTop > 0);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight);
  };

  useEffect(() => {
    updateScrollState();
  }, [coins]);

  // Scroll function
  const scrollByAmount = (amount) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ top: amount, behavior: "smooth" });
  };

  return (
    <Box position="relative" sx={{ width: "100%" }}>
      {/* Top Arrow Button */}
      {canScrollUp && (
        <IconButton
          onClick={() => scrollByAmount(-200)}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            zIndex: 10,
            background: isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
            "&:hover": {
              background: isDark
                ? "rgba(255,255,255,0.2)"
                : "rgba(0,0,0,0.2)",
            },
            borderRadius: "50%",
            backdropFilter: "blur(5px)",
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      )}

      {/* Bottom Arrow Button */}
      {canScrollDown && (
        <IconButton
          onClick={() => scrollByAmount(200)}
          sx={{
            position: "absolute",
            right: 10,
            bottom: 10,
            zIndex: 10,
            background: isDark
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
            "&:hover": {
              background: isDark
                ? "rgba(255,255,255,0.2)"
                : "rgba(0,0,0,0.2)",
            },
            borderRadius: "50%",
            backdropFilter: "blur(5px)",
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      )}

      {/* Top Fade Shadow */}
      {canScrollUp && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 20,
            background: isDark
              ? "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      )}

      {/* Bottom Fade Shadow */}
      {canScrollDown && (
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 20,
            background: isDark
              ? "linear-gradient(to top, rgba(0,0,0,0.4), transparent)"
              : "linear-gradient(to top, rgba(0,0,0,0.1), transparent)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />
      )}

      {/* Table Container */}
      <TableContainer
        ref={containerRef}
        component={Paper}
        onScroll={updateScrollState}
        sx={{
          maxHeight: 600,
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Chrome, Safari, Edge
          borderRadius: 3,
          background: isDark
            ? "rgba(255,255,255,0.05)"
            : "rgba(0,0,0,0.03)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Table stickyHeader sx={{ minWidth: 1000 }}>
          <CustomTableHead stickyBg={stickyBg} />
          <CustomTableBody
            stickyBg={stickyBg}
            coins={coins}
            currency={currency}
            section={section}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}