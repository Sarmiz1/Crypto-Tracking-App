import { Box, Fade } from "@mui/material";
import { OnLoginSection } from "./FormContent_Components/OnLoginSection";
import { OnSignUpSection } from "./FormContent_Components/OnSignUpSection";

export const FormContent = ({
  isLogin,
  onLogin,
  signupRegister,
  handleSignupSubmit,
  signupErrors,
  loading,
  step,
  direction,
  onSignup,
  prevStep,
  nextStep,
  watch,
}) => {

  return (
    <Fade in timeout={400} key={isLogin}>
      <Box sx={{ mt: 3 }}>
        {isLogin ? (
          <OnLoginSection
            onLogin={onLogin} 
            loading={loading}
          />
        ) : (
          <OnSignUpSection 
            step={step}
            onSignup={onSignup}
            handleSignupSubmit={handleSignupSubmit} 
            direction={direction} 
            signupRegister={signupRegister} 
            signupErrors={signupErrors} 
            prevStep={prevStep} 
            nextStep={nextStep} 
            loading={loading}
            watch={watch}
          />
        )}
      </Box>
    </Fade>
  );
};
