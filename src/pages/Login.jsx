import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Frontend validation mirrors the backend domain allow-list.
        const emailPattern = /^[^\s@]+@sece\.ac\.in$/i;
        if (!emailPattern.test(formData.email)) {
            setError("Please enter a valid @sece.ac.in email address.");
            return; 
        }

        try {
            setIsSubmitting(true);
            const response = await api.post('/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/');
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Invalid credentials');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page-container">
            <Card className="auth-form-card">
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-2" disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </Button>
                    </Form>
                    <div className="auth-switch-link">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
