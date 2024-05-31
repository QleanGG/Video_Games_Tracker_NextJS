import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import axios from 'axios';
import { User } from '@/types';

interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	// Optionally, fetch user from backend if already authenticated
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await axios.get<User>('/api/user');
				setUser(data);
			} catch (error) {
				setUser(null);
			}
		};

		fetchUser();
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
