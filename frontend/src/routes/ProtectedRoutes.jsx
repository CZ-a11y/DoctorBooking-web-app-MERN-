import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { token, role, loading: authLoading } = useContext(AuthContext);
    const location = useLocation();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [redirectPath, setRedirectPath] = useState("/login");

    useEffect(() => {
        // Store current path before any redirect happens
        if (token && role && allowedRoles.includes(role)) {
            localStorage.setItem('lastAuthenticatedPath', location.pathname);
        }
    }, [token, role, location.pathname, allowedRoles]);

    useEffect(() => {
        if (!authLoading) {
            // Check if user was previously on a protected route
            const lastPath = localStorage.getItem('lastAuthenticatedPath');

            if (token && role && allowedRoles.includes(role)) {
                // If authenticated and authorized, no redirect needed
                setIsCheckingAuth(false);
            } else {
                // If not authenticated but has a last path, use it after login
                if (lastPath && lastPath !== '/login') {
                    setRedirectPath(`/login?redirect=${encodeURIComponent(lastPath)}`);
                }
                setIsCheckingAuth(false);
            }
        }
    }, [authLoading, token, role, allowedRoles]);

    if (authLoading || isCheckingAuth) {
        // Show loading spinner or skeleton while checking auth state
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>;
    }

    const isAllowed = allowedRoles.includes(role);

    if (!token) {
        // Not authenticated - redirect to login with return path
        return <Navigate to={redirectPath} replace />;
    }

    if (!isAllowed) {
        // Authenticated but not authorized - redirect to not-found or home
        return <Navigate to="/not-found" replace />;
    }

    // Authenticated and authorized - render children
    return children;
};

export default ProtectedRoute;