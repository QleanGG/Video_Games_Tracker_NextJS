import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from '@tanstack/react-query';
import { LoginData, LoginResponse } from '@/types';
// import { useUser } from '@/contexts/UserContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import mainApi from '@/api/apiAxios';
// import { userState } from '@/recoil/atoms';
// import { useSetRecoilState } from 'recoil';

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
	// const setUser = useSetRecoilState(userState);
	const router = useRouter();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: async (data) => {
			// setUser(data.user);
			await queryClient.invalidateQueries({ queryKey: ['user'] });
      console.log('This is the data: ', data)
			router.push('/dashboard');
			toast.success('Login successful!');
		},
		onError: () => {
			toast.error('Invalid email or password.');
		},
	});
};
