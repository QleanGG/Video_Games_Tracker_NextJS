import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import mainApi from '@/api/apiAxios';
import { useQueryClient } from '@tanstack/react-query';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const hasSessionCookie = (): boolean => {
  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  return cookies.some(cookie => cookie.startsWith('connect.sid='));
};


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      if (!hasSessionCookie()) {
        setUserLoading(false);
        return;
      }

      try {
        const { data } = await mainApi.get<User>('/auth/user');
        setUser(data);
      } catch (error) {
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};
