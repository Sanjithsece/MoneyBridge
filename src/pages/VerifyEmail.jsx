import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Alert, Button, Card, Spinner } from 'react-bootstrap';
import api from '../services/api';

const VerifyEmail = () => {
    const { token } = useParams();
    const [status, setStatus] = useState({ loading: true, error: '', message: '' });

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await api.get(`/auth/verify-email/${token}`);
                setStatus({ loading: false, error: '', message: response.data?.message || 'Email verified successfully.' });
            } catch (err) {
                setStatus({
                    loading: false,
                    error: err.response?.data?.message || 'Verification failed. The link may be invalid or expired.',
                    message: '',
                });
            }
        };

        verifyToken();
    }, [token]);

    return (
        <div className="auth-page-container">
            <Card className="auth-form-card">
                <Card.Body className="text-center">
                    <h2 className="mb-4">Email Verification</h2>
                    {status.loading && (
                        <div className="py-4">
                            <Spinner animation="border" />
                        </div>
                    )}
                    {status.message && <Alert variant="success">{status.message}</Alert>}
                    {status.error && <Alert variant="danger">{status.error}</Alert>}
                    {!status.loading && (
                        <Button as={Link} to="/login" variant="primary" className="mt-2">
                            Go to Login
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default VerifyEmail;
