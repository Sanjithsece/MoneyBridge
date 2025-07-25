import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { Container, Card, Row, Col, Table, Badge, Spinner } from 'react-bootstrap';

const UserDetails = () => {
    const { userId } = useParams(); 
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/admin/users/${userId}`)
            .then(res => {
                setUserData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [userId]);

    if (loading) {
        return <Container className="text-center mt-5"><Spinner animation="border" /></Container>;
    }

    if (!userData) {
        return <Container className="text-center mt-5"><h2>User not found.</h2></Container>;
    }

    const { user, proposals } = userData;

    return (
        <Container className="mt-4">
            <Link to="/admin/dashboard">← Back to Dashboard</Link>
            <h1 className="my-3">User Details</h1>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Header>Profile</Card.Header>
                        <Card.Body>
                            <Card.Title>{user.fullName}</Card.Title>
                            <Card.Text>
                                <strong>ID:</strong> {user.id}<br />
                                <strong>Phone:</strong> {user.phoneNumber}<br />
                                <strong>Role:</strong> {user.role}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card>
                        <Card.Header>Proposals Made by This User ({proposals.length})</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Proposal ID</th>
                                        <th>Request ID</th>
                                        <th>Status</th>
                                        <th>Meeting Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {proposals.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td>{p.exchangeRequest?.id || 'N/A'}</td>
                                            <td><Badge>{p.status}</Badge></td>
                                            <td>{new Date(p.meetingTime).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserDetails;