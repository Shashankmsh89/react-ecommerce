import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
    children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
}

export default ProtectedRoute;
