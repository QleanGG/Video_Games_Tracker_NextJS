import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileResponse, Profile } from '@/types';
import mainApi from '@/api/apiAxios';

const fetchProfile = async (): Promise<ProfileResponse> => {
  const { data } = await mainApi.get<ProfileResponse>(`/profile`);
  return data;
};

const updateProfile = async (formData: FormData): Promise<Profile> => {
  const { data } = await mainApi.put<{ profile: Profile }>(`/profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data.profile;
};

export const useProfile = (isEnabled: boolean) => {
  return useQuery<ProfileResponse, Error>({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    enabled: isEnabled
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<Profile, Error, FormData>({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};
