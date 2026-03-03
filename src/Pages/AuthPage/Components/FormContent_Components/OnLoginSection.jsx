import { useForm } from "react-hook-form";
import { loginSchema } from "../../Feautures/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";


export const OnLoginSection = ({ onLogin, loading }) => {

    const [showPassword, setShowPassword] = useState(false);


  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  return (
    <Box component="form" onSubmit={handleLoginSubmit(onLogin)}>
      <TextField
        label="Email"
        fullWidth
        sx={{ mb: 2 }}
        {...loginRegister("email")}
        error={!!loginErrors.email}
        helperText={loginErrors.email?.message}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        sx={{ mb: 3 }}
        {...loginRegister("password")}
        error={!!loginErrors.password}
        helperText={loginErrors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </Box>
  );
};
