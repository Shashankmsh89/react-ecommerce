import { createContext } from "react";

export interface AuthUser {
    email: string;
}

export interface AuthContextValue {
    isLoggedIn: boolean;
    user: AuthUser | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

export const AuthContext =
    createContext<AuthContextValue | undefined>(undefined);
