import axios from 'axios';

interface UserData {
  email: string;
  username: string;
  password: string;
}

export const registerUser = async (userData: UserData): Promise<any> => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/register`, userData);
  return response.data;
};
