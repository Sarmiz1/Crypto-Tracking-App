import { Fade, Typography, Box, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const Success = ({ navigate, isLogin }) => {
  return (
    <Fade in>
      <Box textAlign="center">
        {isLogin ? (
          <>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              mb={1}
            >
              <CheckCircleIcon color="primary" fontSize="large" />
              <Typography variant="h4" fontWeight="bold">
                Correct!
              </Typography>
            </Box>
            <Typography fontWeight={400}>Logged in successfully.</Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              🎉 Success!
            </Typography>
            <Typography>Your account was completed successfully.</Typography>
          </>
        )}
        <Button
          sx={{ mt: 3 }}
          variant="contained"
          onClick={() => {
            navigate(isLogin ? "/" : "/login");
          }}
        >
          {isLogin ? "Return to Home" : "Go to Login"}
        </Button>
      </Box>
    </Fade>
  );
};
