import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { LoginData, LoginResponse } from '@/types';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import mainApi from '@/api/apiAxios';

const loginUser = async ({ email, password }: LoginData): Promise<LoginResponse> => {
  const response = await mainApi.post<LoginResponse>('/auth/login', { email, password });
  return response.data;
};

export const useLogin = (): UseMutationResult<LoginResponse, Error, LoginData> => {
  const { setUser } = useUser();
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data.user);
      toast.success('Login successful!');
      router.push('/');
    },
    onError: () => {
      toast.error('Invalid email or password.');
    },
  });
};
