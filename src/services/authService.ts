import mainApi from "@/api/apiAxios";

export const logout = async () => {
    await mainApi.get('/auth/logout');
  };