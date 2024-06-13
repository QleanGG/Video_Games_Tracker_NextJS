import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from '@tanstack/react-query';
import { LoginData, LoginResponse } from '@/types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import mainApi from '@/api/apiAxios';

const loginUser = async ({
	email,
	password,
}: LoginData): Promise<LoginResponse> => {
	const response = await mainApi.post<LoginResponse>('/auth/login', {
		email,
		password,
	});
	return response.data;
};

export const useLogin = (): UseMutationResult<
	LoginResponse,
	Error,
	LoginData
> => {
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['user'] });
			router.push('/dashboard');
			toast.success('Login successful!');
		},
		onError: () => {
			toast.error('Invalid email or password.');
		},
	});
};
