import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, TextField, Button, Typography, CircularProgress, Divider } from '@mui/material';
import { toast } from 'react-toastify';
import { useRegister } from '@/hooks/useRegister';
import styles from '@/styles/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { GetStaticProps } from 'next';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const { isLoading, error, register } = useRegister();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const success = await register({ email, username, password });

    if (success) {
      toast.success('Registration successful!');
      router.push('/login');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`;
  };

  return (
    <Box sx={styles.formContainer}>
      <Typography variant="h4" sx={styles.formTitle}>Register</Typography>
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
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
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
          autoComplete="new-password"
          sx={styles.formField}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          sx={styles.formField}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={styles.submitButton} disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
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
        Sign Up with Google
      </Button>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}, 
  };
};

export default Register;
