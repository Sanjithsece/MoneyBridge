import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Form, Button, Alert } from 'react-bootstrap';

const CreateRequest = () => {
  const [formData, setFormData] = useState({ amount: '', haveType: 'CASH', needType: 'UPI', locationHint: '' });
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setCurrentUser(res.data))
      .catch(err => setError('Could not fetch user data.'));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setError("User data not loaded yet. Please wait.");
      return;
    }
    try {
      const payload = { ...formData, userId: currentUser.id };
      await api.post('/requests', payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to create request');
    }
  };

  return (
    <div className="create-request-container">
      <div className="create-request-card">
        <div className="info-panel">
          <p className="eyebrow">Fast local matching</p>
          <h2>Bridge cash and UPI inside campus.</h2>
          <p>Post the amount, what you have, and where nearby students can meet you.</p>
        </div>
        <div className="form-panel">
          <h2 className="mb-4">Create Exchange Request</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control type="number" min="1" name="amount" onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>I Have</Form.Label>
              <Form.Select name="haveType" onChange={handleChange} value={formData.haveType}>
                <option value="CASH">CASH</option>
                <option value="UPI">UPI</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>I Need</Form.Label>
              <Form.Select name="needType" onChange={handleChange} value={formData.needType}>
                <option value="UPI">UPI</option>
                <option value="CASH">CASH</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location Hint (e.g., "Near Library")</Form.Label>
              <Form.Control type="text" name="locationHint" onChange={handleChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3">
              Submit Request
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
