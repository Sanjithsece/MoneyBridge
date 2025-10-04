import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Spinner } from 'react-bootstrap';

const ProtectedRoute = ({ children }) => {
    const { token, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Spinner animation="border" />
            </div>
        );
    }

    if (!token) {
 
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
