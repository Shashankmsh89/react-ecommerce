import { useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextValue, AuthUser } from "./AuthContextDefinition";
import { AuthContext } from "./AuthContextDefinition";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null);

    function login(email: string, password: string): boolean {
        if (!email.trim() || !password.trim()) {
            return false;
        }

        setUser({ email: email.trim() });
        return true;
    }

    function logout() {
        setUser(null);
    }

    const value: AuthContextValue = {
        isLoggedIn: user !== null,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
