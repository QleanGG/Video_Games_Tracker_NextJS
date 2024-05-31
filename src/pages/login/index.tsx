import { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useLogin } from '@/hooks/useLogin';
import styles from '@/styles/styles';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending } = useLogin();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    mutate({ email, password });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  return (
    <Box sx={styles.formContainer}>
      <Typography variant="h4" sx={styles.formTitle}>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          sx={styles.formField}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          sx={styles.formField}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={styles.submitButton} disabled={isPending}>
          {isPending ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </form>
      <Divider sx={{ my: 2 }}>OR</Divider>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={handleGoogleLogin}
        sx={{ mt: 2 }}
      >
        Sign In with Google
      </Button>
    </Box>
  );
};

export default Login;
