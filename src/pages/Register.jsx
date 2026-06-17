import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Register = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Frontend validation mirrors the backend: only SECE email IDs can register.
        const emailPattern = /^[^\s@]+@sece\.ac\.in$/i;
        if (!emailPattern.test(formData.email)) {
            setError("Please enter a valid @sece.ac.in email address.");
            return; 
        }
        try {
            setIsSubmitting(true);
            const response = await api.post('/auth/register', {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
            });
            setSuccess(response.data?.message || 'Registration successful. Please check your email.');
            setTimeout(() => navigate('/login'), 2500);
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page-container">
            <Card className="auth-form-card">
                <Card.Body>
                    <h2 className="text-center mb-4">Create Your Account</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" name="fullName" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleChange} required />
                        </Form.Group> 
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-2" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending verification email...' : 'Sign Up'}
                        </Button>
                    </Form>
                    <div className="auth-switch-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;
