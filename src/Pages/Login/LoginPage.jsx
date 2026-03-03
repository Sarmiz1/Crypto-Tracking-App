import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import z, { email } from "zod";
import { useForm } from "react-hook-form";


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with your login logic
    alert(`Logging in with\nEmail: ${email}\nPassword: ${password}`);
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
          width: 400,
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
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, color: "#555" }}
          >
            Sign in to your account
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              required
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                py: 1.5,
                fontWeight: "bold",
                fontSize: "16px",
                "&:hover": {
                  background: "linear-gradient(90deg, #5a0eb8 0%, #1f65e0 100%)",
                },
              }}
            >
              Login
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: "#888" }}
          >
            Don't have an account? <Link to={'/createAccount'}>Sign Up</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}