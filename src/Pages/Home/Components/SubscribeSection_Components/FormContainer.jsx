import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { keyframes } from "@emotion/react";

// ========================
//  ZOD SCHEMA
// ========================
const subscribeSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

// ========================
//  SHAKE ANIMATION FOR INPUT ERROR
// ========================
const shake = keyframes`
  0% { transform: translateX(0) }
  25% { transform: translateX(-5px) }
  50% { transform: translateX(5px) }
  75% { transform: translateX(-5px) }
  100% { transform: translateX(0) }
`;

// ========================
//  FADE-IN ANIMATION FOR SUCCESS MESSAGE
// ========================
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
`;


export default function FormContainer() {

  // ========================
  //  REACT HOOK FORM SETUP
  // ========================
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({
    resolver: zodResolver(subscribeSchema),
  });

  // ========================
  //  FORM SUBMIT HANDLER
  // ========================
  const onSubmit = async (data) => {
    console.log("Submitted data:", data);
    await new Promise((res) => setTimeout(res, 1000)); // simulate API delay
    reset();
  };

  
  return (
    <>

      {/* ========================
              FORM
          ======================== */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* ========================
                FLEX CONTAINER FOR INPUT + BUTTON
            ======================== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* ========================
                  EMAIL INPUT
              ======================== */}
          <TextField
            label="Enter your email"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              flex: { xs: "unset", md: "1 1 320px" }, // wider input on desktop
              width: { xs: "100%", md: "320px" },
              animation: errors.email ? `${shake} 0.3s` : "none",
            }}
          />

          {/* ========================
                  SUBSCRIBE BUTTON
                  - Hover animation scale
              ======================== */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{
              height: 48,
              width: { xs: "100%", md: "auto" }, // full-width on mobile, natural width on desktop
              whiteSpace: "nowrap",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
              alignSelf: "flex-start", // ensures button aligns vertically with input
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </Box>

        {/* ========================
                SUCCESS MESSAGE
                - Fade-in animation
            ======================== */}
        {isSubmitSuccessful && (
          <Typography
            variant="body2"
            sx={{
              color: "green",
              mt: 1,
              animation: `${fadeIn} 0.5s ease-in-out`,
            }}
          >
            Thank you! You are now subscribed.
          </Typography>
        )}
      </form>
    </>
  );
}
