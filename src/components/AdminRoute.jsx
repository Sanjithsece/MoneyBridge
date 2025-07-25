import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const isAdmin = decodedToken.roles?.includes('ROLE_ADMIN');
        return isAdmin ? children : <Navigate to="/" />;
    } catch (error) {
        return <Navigate to="/login" />;
    }
};

export default AdminRoute;