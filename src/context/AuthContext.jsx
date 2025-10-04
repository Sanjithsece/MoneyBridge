import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        if (token) {
            try {
    
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await api.get('/users/me');
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user or token is invalid", error);
           
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
        }
        setLoading(false);
    }, [token]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete api.defaults.headers.common['Authorization'];
    };

    const isAdmin = user?.role === 'ROLE_ADMIN';

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;