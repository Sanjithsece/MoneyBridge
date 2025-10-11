import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Form, Button, Card, Alert } from 'react-bootstrap';

const Register = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', phoneNumber: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(formData.email)) {
            setError("Please enter a valid email address (e.g., user@example.com).");
            return; 
        }
      

      
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(formData.phoneNumber)) {
            setError("Phone number must be exactly 10 digits.");
            return; 
        }
     

        try {
            await api.post('/users/register', formData);
            navigate('/login'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="auth-page-container">
            <Card className="auth-form-card">
                <Card.Body>
                    <h2 className="text-center mb-4">Create Your Account</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
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
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" name="phoneNumber" onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mt-2">
                            Sign Up
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