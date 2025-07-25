import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Container, Card, Button, Badge, Alert, ListGroup, Row, Col, Spinner } from 'react-bootstrap';

const MyRequests = () => {
    const [myRequests, setMyRequests] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        setLoading(true);
        Promise.all([
            api.get('/requests/my-requests'),
            api.get('/notifications')
        ]).then(([requestsRes, notifsRes]) => {
            setMyRequests(Array.isArray(requestsRes.data) ? requestsRes.data : []);
            setNotifications(Array.isArray(notifsRes.data) ? notifsRes.data : []);
        }).catch(() => {
            setError("Failed to fetch data.");
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
        api.post('/notifications/mark-as-read').catch(console.error);
    }, []);

    const handleAccept = async (proposalId) => {
        try {
            await api.put(`/meetings/${proposalId}/accept`);
            setSuccess("Proposal accepted! This request is now pending.");
            setTimeout(fetchData, 1500);
        } catch (err) { setError("Failed to accept proposal."); }
    };

    const handleReject = async (proposalId) => {
        try {
            await api.put(`/meetings/${proposalId}/reject`);
            setSuccess("Proposal rejected.");
            setTimeout(fetchData, 1500);
        } catch (err) { setError("Failed to reject proposal."); }
    };

    if (loading) {
        return <Container className="text-center mt-5"><Spinner animation="border" /></Container>
    }

    return (
        <Container className="mt-4">
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
            {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}
            <Row>
                <Col md={8}>
                    <h2>My Requests & Proposals</h2>
                    {myRequests.length > 0 ? myRequests.map(req => (
                        <Card key={req.id} className="mb-4">
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                Request for ₹{req.amount} ({req.haveType} to {req.needType})
                                
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>Proposals Received</Card.Title>
                                {Array.isArray(req.meetingProposals) && req.meetingProposals.length > 0 ? (
                                    <ListGroup variant="flush">
                                        {req.meetingProposals.map(proposal => (
                                            <ListGroup.Item key={proposal.id} className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>Proposal from: {proposal.proposer.fullName}</strong>
                                                    <br />
                                                    <small className="text-muted">
                                                        Time: {new Date(proposal.meetingTime).toLocaleString()}
                                                    </small>
                                                    <br/>
                                                    Status: <Badge bg={proposal.status === 'PROPOSED' ? 'warning' : (proposal.status === 'ACCEPTED' ? 'success' : 'danger')}>{proposal.status}</Badge>
                                                </div>
                                                { proposal.status === 'PROPOSED' && (
                                                    <div>
                                                        <Button variant="success" size="sm" className="me-2" onClick={() => handleAccept(proposal.id)}>Accept</Button>
                                                        <Button variant="danger" size="sm" onClick={() => handleReject(proposal.id)}>Reject</Button>
                                                    </div>
                                                )}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (<p>No proposals yet.</p>)}
                            </Card.Body>
                        </Card>
                    )) : (<p>You have not created any requests.</p>)}
                </Col>
                <Col md={4}>
                    <h2>Notifications</h2>
                    <ListGroup>
                        {notifications.length > 0 ? notifications.map(notif => (
                            <ListGroup.Item key={notif.id} variant={!notif.isRead ? 'light' : ''}>
                                {notif.message}
                                <br/>
                                <small className="text-muted">{new Date(notif.createdAt).toLocaleString()}</small>
                            </ListGroup.Item>
                        )) : (<p>No notifications.</p>)}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default MyRequests;