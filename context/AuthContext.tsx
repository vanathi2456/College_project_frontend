import React, { createContext, useContext, useState } from 'react';
import { AuthState, User, UserRole } from '../types';

const AuthContext = createContext<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    login: async () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string, role: UserRole) => {
        setIsLoading(true);
        // Mock login delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock generic user
        const mockUser: User = {
            id: '1',
            name: 'Test User',
            email: email,
            role: role,
        };

        setUser(mockUser);
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
