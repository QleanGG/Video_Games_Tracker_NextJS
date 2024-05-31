import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface UserData {
  email: string;
  username: string;
  password: string;
}

interface UseRegisterReturn {
  isLoading: boolean;
  error: string | null;
  register: (userData: UserData) => Promise<boolean>;
}

export const useRegister = (): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: UserData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`, userData);
      if (response.data.message) {
        setError(response.data.message);
        return false;
      }
      return true;
    } catch (err) {
      const errorResponse = err as AxiosError<{ message: string }>;
      if (errorResponse.response) {
        setError(errorResponse.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, register };
};
