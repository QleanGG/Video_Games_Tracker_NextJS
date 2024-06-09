import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { logout as logoutService } from '@/services/authService';
import { toast } from 'react-toastify';

export const useGlobalLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async () => {
    await logoutService();

     // Invalidate specific queries
    queryClient.invalidateQueries({ queryKey: ['user'] });
    queryClient.invalidateQueries({ queryKey: ['profile'] });
    queryClient.invalidateQueries({ queryKey: ['userGames'] });
    
    toast.info('Logged out successfully');
    await router.push('/login');
  };

  return { logout };
};
