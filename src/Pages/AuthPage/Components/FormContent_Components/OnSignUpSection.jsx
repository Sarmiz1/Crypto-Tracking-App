import {
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthFormStep } from "./AuthFormStep";
import { useState } from "react";
import { getStrengthColor } from "../../Feautures/getStrengthColor";
import { calculatePasswordStrength } from "../../Feautures/calculatePasswordStrenght";

export const OnSignUpSection = ({
  step,
  onSignup,
  handleSignupSubmit,
  direction,
  signupRegister,
  prevStep,
  nextStep,
  loading,
  signupErrors,
  watch,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const steps = ["Personal", "Contact", "Security"];
  const passwordValue = watch("password", "");
  const passwordStrength = calculatePasswordStrength(passwordValue);

  return (
    <>
      <Stepper activeStep={step} sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box component="form" onSubmit={handleSignupSubmit(onSignup)}>
        <AuthFormStep direction={direction}>
          {step === 0 && (
            <>
              <TextField
                label="Full Name"
                fullWidth
                sx={{ mb: 2 }}
                {...signupRegister("fullName")}
              />
              <TextField
                label="Email"
                fullWidth
                sx={{ mb: 2 }}
                {...signupRegister("email")}
                error={!!signupErrors.email}
                helperText={signupErrors.email?.message}
              />
              <TextField
                select
                label="Gender"
                fullWidth
                sx={{ mb: 2 }}
                {...signupRegister("gender")}
                error={!!signupErrors.gender}
                helperText={signupErrors.gender?.message}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </>
          )}

          {step === 1 && (
            <>
              <TextField
                label="Phone"
                fullWidth
                sx={{ mb: 2 }}
                {...signupRegister("phone")}
                error={!!signupErrors.phone}
                helperText={signupErrors.phone?.message}
              />
              <TextField
                label="Address"
                multiline
                rows={3}
                fullWidth
                sx={{ mb: 2 }}
                {...signupRegister("address")}
                error={!!signupErrors.address}
                helperText={signupErrors.address?.message}
              />
            </>
          )}

          {step === 2 && (
            <>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                sx={{ mb: 1 }}
                {...signupRegister("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {passwordValue && (
                <Box sx={{ mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    color={getStrengthColor()}
                    sx={{ height: 8, borderRadius: 5 }}
                  />
                  <Typography variant="caption">
                    Strength: {passwordStrength}%
                  </Typography>
                </Box>
              )}

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                {...signupRegister("confirmPassword")}
                error={!!signupErrors.confirmPassword}
                helperText={signupErrors.confirmPassword?.message}
              />

              <FormControlLabel
                control={<Checkbox {...signupRegister("agree")} />}
                label="I agree to the Privacy Policy"
              />
            </>
          )}
        </AuthFormStep>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          {step > 0 && (
            <Button fullWidth onClick={prevStep}>
              Back
            </Button>
          )}

          {step < 2 ? (
            <Button fullWidth variant="contained" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign Up"}
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};
