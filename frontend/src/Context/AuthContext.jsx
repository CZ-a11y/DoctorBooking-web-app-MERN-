import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    user: null,
    role: null,
    token: null,
    loading: false,
    error: null
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'LOGIN_SUCCESS':
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);

            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
                loading: false,
                error: null
            };

        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case 'LOGOUT':
            // Clear localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('role');

            return {
                ...state,
                user: null,
                role: null,
                token: null,
                loading: false,
                error: null
            };

        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check for existing auth data on initial load
    useEffect(() => {
        const loadAuthData = () => {
            try {
                const user = localStorage.getItem('user');
                const token = localStorage.getItem('token');
                const role = localStorage.getItem('role');

                if (user && token && role) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            user: JSON.parse(user),
                            token,
                            role
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to load auth data:", error);
                // Clear invalid data
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
            }
        };

        loadAuthData();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};