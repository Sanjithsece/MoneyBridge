import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalTransactions: 0 });
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = () => {
        api.get('/admin/users').then(res => setUsers(res.data));
    };

    useEffect(() => {
        api.get('/admin/stats').then(res => setStats(res.data));
        fetchUsers();
        api.get('/admin/transactions').then(res => setTransactions(res.data));
    }, []);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
            try {
                await api.delete(`/admin/users/${userId}`);
                fetchUsers(); 
            } catch (error) {
                alert('Failed to delete user.');
            }
        }
    };

    return (
        <Container fluid className="mt-4">
            <h1>Admin Dashboard</h1>
            <Row className="my-4">
                <Col md={6}>
                    <Card bg="primary" text="white" className="mb-3">
                        <Card.Body>
                            <Card.Title>Total Users</Card.Title>
                            <Card.Text as="h2">{stats.totalUsers}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card bg="success" text="white" className="mb-3">
                        <Card.Body>
                            <Card.Title>Total Transactions (Proposals)</Card.Title>
                            <Card.Text as="h2">{stats.totalTransactions}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h2 className="mt-4">All Users</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Phone Number</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.phoneNumber}</td>
                            <td><Badge bg={user.role === 'ROLE_ADMIN' ? 'danger' : 'secondary'}>{user.role}</Badge></td>
                            <td>
                                <Button variant="info" size="sm" className="me-2" onClick={() => navigate(`/admin/users/${user.id}`)}>
                                    View Details
                                </Button>
                                {user.role !== 'ROLE_ADMIN' && (
                                    <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>
                                        Delete
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2 className="mt-5">All Transactions (Proposal History)</h2>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Proposer</th>
                        <th>Receiver</th>
                        <th>Status</th>
                        <th>Meeting Time</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx.id}>
                            <td>{tx.exchangeRequest?.id || 'N/A'}</td>
                            <td>{tx.proposer?.fullName || 'N/A'}</td>
                            <td>{tx.receiver?.fullName || 'N/A'}</td>
                            <td><Badge>{tx.status}</Badge></td>
                            <td>{new Date(tx.meetingTime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminDashboard;