"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { tempStorage } from '@/lib/utils/storage';

// ==========================================
// TYPES
// ==========================================
export type UserType = 'individual' | 'business';

export interface UserDetails {
    id?: string;
    email?: string;
    name?: string;
    businessName?: string;
    role?: string;
    [key: string]: any;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

interface UserTypeContextType {
    userType: UserType;
    setUserType: (type: UserType) => void;
    userDetails: UserDetails | null;
    setUserDetails: (details: UserDetails | null) => void;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<UserType>;
    register: (type: UserType, data: any) => Promise<void>;
    logout: () => void;
}

// ==========================================
// DEFAULT CONTEXT
// ==========================================
const defaultContext: UserTypeContextType = {
    userType: 'individual',
    setUserType: () => { },
    userDetails: null,
    setUserDetails: () => { },
    isAuthenticated: false,
    login: async () => 'individual',
    register: async () => { },
    logout: () => { }
};

const UserTypeContext = createContext<UserTypeContextType>(defaultContext);

// ==========================================
// PROVIDER
// ==========================================
interface UserTypeProviderProps {
    children: ReactNode;
}

export function UserTypeProvider({ children }: UserTypeProviderProps) {
    const [userType, setUserType] = useState<UserType>('individual');
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // ==========================================
    // LOAD USER DATA FROM tempStorage
    // ==========================================
    useEffect(() => {
        try {
            const savedType = tempStorage.get<UserType>('userType');
            const savedDetails = tempStorage.get<UserDetails>('userDetails');
            const savedAuth = tempStorage.get<boolean>('isAuthenticated');

            if (savedType === 'individual' || savedType === 'business') {
                setUserType(savedType);
            }
            if (savedDetails) {
                setUserDetails(savedDetails);
            }
            if (savedAuth === true) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // ==========================================
    // LOGIN
    // ==========================================
    const login = async (credentials: LoginCredentials): Promise<UserType> => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Determine user type based on email
            const determinedType: UserType =
                credentials.email.includes('@hospital.') ||
                    credentials.email.includes('@clinic.') ||
                    credentials.email.includes('@medical.')
                    ? 'business'
                    : 'individual';

            const mockUserDetails: UserDetails = {
                id: Math.random().toString(36).substring(7),
                email: credentials.email,
                name: determinedType === 'individual' ? 'John Doe' : 'MedCorp Inc.',
                businessName: determinedType === 'business' ? 'MedCorp Inc.' : undefined,
                role: determinedType,
                createdAt: new Date().toISOString()
            };

            setUserType(determinedType);
            setUserDetails(mockUserDetails);
            setIsAuthenticated(true);

            // Save to tempStorage
            tempStorage.set('userType', determinedType);
            tempStorage.set('userDetails', mockUserDetails);
            tempStorage.set('isAuthenticated', true);

            return determinedType;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // REGISTER
    // ==========================================
    const register = async (type: UserType, data: any) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newUserDetails: UserDetails = {
                id: Math.random().toString(36).substring(7),
                email: data.email,
                name: type === 'individual' ? data.name || 'New User' : data.businessName || 'New Business',
                businessName: type === 'business' ? data.businessName : undefined,
                role: type,
                createdAt: new Date().toISOString(),
                ...data
            };

            setUserType(type);
            setUserDetails(newUserDetails);
            setIsAuthenticated(true);

            // Save to tempStorage
            tempStorage.set('userType', type);
            tempStorage.set('userDetails', newUserDetails);
            tempStorage.set('isAuthenticated', true);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // ==========================================
    // LOGOUT
    // ==========================================
    const logout = () => {
        setUserType('individual');
        setUserDetails(null);
        setIsAuthenticated(false);

        // Clear from tempStorage
        tempStorage.remove('userType');
        tempStorage.remove('userDetails');
        tempStorage.remove('isAuthenticated');
    };

    // ==========================================
    // CONTEXT VALUE
    // ==========================================
    const contextValue: UserTypeContextType = {
        userType,
        setUserType,
        userDetails,
        setUserDetails,
        isAuthenticated,
        login,
        register,
        logout
    };

    return (
        <UserTypeContext.Provider value={contextValue}>
            {children}
        </UserTypeContext.Provider>
    );
}

// ==========================================
// HOOK
// ==========================================
export function useUserType(): UserTypeContextType {
    const context = useContext(UserTypeContext);
    if (!context) {
        throw new Error('useUserType must be used within a UserTypeProvider');
    }
    return context;
}

export default UserTypeContext;