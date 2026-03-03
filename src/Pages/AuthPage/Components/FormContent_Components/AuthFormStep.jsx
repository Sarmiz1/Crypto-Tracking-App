import { Box, Slide } from "@mui/material";

// ================= REUSABLE STEP WRAPPER =================
export const AuthFormStep = ({ children, direction }) => (
  <Slide direction={direction} in mountOnEnter unmountOnExit>
    <Box>{children}</Box>
  </Slide>
);