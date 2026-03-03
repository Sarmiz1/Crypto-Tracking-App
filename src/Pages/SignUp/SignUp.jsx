import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Slide,
} from "@mui/material";

export default function SignUpMultiStepAnimated() {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState("left");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    country: "",
    agreePrivacy: false,
  });

  const steps = ["Account Info", "Personal Info", "Privacy & Submit"];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.fullName || !formData.username || !formData.email) {
        alert("Please fill all fields in this step!");
        return;
      }
    } else if (activeStep === 1) {
      if (!formData.phone || !formData.address || !formData.city || !formData.country) {
        alert("Please fill all fields in this step!");
        return;
      }
    } else if (activeStep === 2) {
      if (!formData.password || !formData.confirmPassword) {
        alert("Please enter password!");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (!formData.agreePrivacy) {
        alert("You must agree to the privacy policy!");
        return;
      }
      alert("Form submitted successfully!\n" + JSON.stringify(formData, null, 2));
      return;
    }
    setDirection("left");
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection("right");
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <Typography
              variant="body2"
              align="center"
              sx={{
                mt: 2,
                color: "#888",
                "& a": {
                  color: "#2575fc",
                  textDecoration: "none",
                  fontWeight: "bold",
                },
                "& a:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </>
        );
      case 1:
        return (
          <>
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              name="city"
              value={formData.city}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              name="country"
              value={formData.country}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 2 }}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreePrivacy}
                  name="agreePrivacy"
                  onChange={handleChange}
                  required
                />
              }
              label="I agree to the Privacy Policy"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        mb: -8,
      }}
    >
      <Card
        sx={{
          width: 450,
          borderRadius: 3,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
          p: 3,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Sign Up
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: 300, position: "relative" }}>
            {steps.map((_, index) => (
              <Slide
                key={index}
                direction={direction}
                in={activeStep === index}
                mountOnEnter
                unmountOnExit
              >
                <Box sx={{ position: "absolute", width: "100%" }}>
                  {renderStepContent()}
                </Box>
              </Slide>
            ))}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            {activeStep > 0 && (
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                "&:hover": {
                  background: "linear-gradient(90deg, #5a0eb8 0%, #1f65e0 100%)",
                },
              }}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}