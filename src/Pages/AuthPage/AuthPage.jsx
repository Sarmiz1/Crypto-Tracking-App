import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Success } from "./Components/Success";
import { FormContent } from "./Components/FormContent";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./Feautures/Schemas";



export default function AuthPage({ login='true' }) {
  const [isLogin, setIsLogin] = useState(login);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState("left");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  

  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    watch,
    trigger,
    formState: { errors: signupErrors },
  } = useForm({ resolver: zodResolver(signupSchema) });


  
  

  // ================= FAKE API CALL =================
  const fakeApiCall = (data) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(data), 2000);
    });

  const onLogin = async (data) => {
    setLoading(true);
    await fakeApiCall(data);
    setLoading(false);
    setSuccess(true);
  };

  const onSignup = async (data) => {
    setLoading(true);
    await fakeApiCall(data);
    setLoading(false);
    setSuccess(true);
  };

  const nextStep = async () => {
    let fields = [];
    if (step === 0) fields = ["fullName", "email", "gender"];
    if (step === 1) fields = ["phone", "address"];
    if (step === 2) fields = ["password", "confirmPassword", "agree"];

    const valid = await trigger(fields);
    if (valid) {
      setDirection("left");
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setDirection("right");
    setStep((prev) => prev - 1);
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Card sx={{ width: 500, borderRadius: 4, boxShadow: 6 }}>
        <CardContent sx={{ p: 4 }}>
          {success ? (
            <Success 
              setSuccess={setSuccess} 
              setIsLogin={setIsLogin} 
              setStep={setStep} 
            />
          ) : (
            <>
              <Typography variant="h4" align="center" fontWeight="bold">
                {isLogin ? "Welcome Back" : "Create Account"}
              </Typography>

              <FormContent 
                isLogin={isLogin} 
                onLogin={onLogin} 
                loading={loading}
                step={step}
                direction={direction}
                onSignup={onSignup}
                prevStep={prevStep}
                nextStep={nextStep}
                handleSignupSubmit={handleSignupSubmit}
                signupRegister={signupRegister}
                signupErrors={signupErrors}
                watch={watch}
              />

              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button onClick={() => { setIsLogin(!isLogin); setStep(0); }}>
                  {isLogin ? "Sign Up" : "Login"}
                </Button>
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
