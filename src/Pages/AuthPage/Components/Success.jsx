import { Fade, Typography, Box, Button } from "@mui/material";
export const Success = ({ setSuccess, setIsLogin, setStep}) => {
  return (
    <Fade in>
      <Box textAlign="center">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          🎉 Success!
        </Typography>
        <Typography>Your account action was completed successfully.</Typography>
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => {
            setSuccess(false);
            setIsLogin(true);
            setStep(0);
          }}
        >
          Go to Login
        </Button>
      </Box>
    </Fade>
  );
};
