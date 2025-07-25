import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import api from '../services/api';

const ProposeMeetingModal = ({ show, handleClose, request, currentUser }) => {
    const [meetingTime, setMeetingTime] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!currentUser || !request) {
            setError("Data is missing, cannot create proposal.");
            return;
        }

        const payload = {
            requestId: request.id,
            proposerId: currentUser.id,
            receiverId: request.user.id,
            locationId: 1,
            meetingTime: meetingTime,
        };

        try {
            await api.post('/meetings/propose', payload);
            setSuccess("Meeting proposal sent successfully! You can now close this window.");
            setTimeout(handleClose, 3000);
        } catch (err) {
            setError(err.response?.data || "Failed to send proposal.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Propose Meeting for ₹{request?.amount}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                {!success && (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Proposed Meeting Time</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={meetingTime}
                                onChange={(e) => setMeetingTime(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <p>You are proposing a meeting with {request?.user.fullName}.</p>
                        <Button variant="primary" type="submit">
                            Send Proposal
                        </Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ProposeMeetingModal;