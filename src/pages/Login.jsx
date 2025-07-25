import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({ phoneNumber: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
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
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" name="phoneNumber" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-2">
              Login
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