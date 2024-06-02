import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import mainApi from '@/api/apiAxios';
import { UserGame, GameStatus } from '@/types';

const fetchUserGames = async (): Promise<UserGame[]> => {
  const { data } = await mainApi.get<UserGame[]>('/user/games');
  return data;
};

const addUserGame = async (userGame: { gameId: number; status: GameStatus; rating?: number; review?: string }): Promise<UserGame> => {
  const { data } = await mainApi.post<UserGame>('/user/games', userGame);
  return data;
};

const updateUserGame = async (userGame: Partial<UserGame> & { gameId: number }): Promise<UserGame> => {
  const { data } = await mainApi.put<UserGame>(`/user/games/${userGame.id}`, userGame);
  return data;
};

const deleteUserGame = async (userGameId: number): Promise<{ message: string }> => {
  const { data } = await mainApi.delete<{ message: string }>(`/user/games/${userGameId}`);
  return data;
};

export const useUserGames = (isEnabled: boolean = true) => {
  return useQuery<UserGame[], Error>({
    queryKey: ['userGames'],
    queryFn: fetchUserGames,
    enabled: isEnabled
  });
};

export const useAddUserGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUserGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGames'] });
    },
  });
};

export const useUpdateUserGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGames'] });
    },
  });
};

export const useDeleteUserGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userGames'] });
    },
  });
};
