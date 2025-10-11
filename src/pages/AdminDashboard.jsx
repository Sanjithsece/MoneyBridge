import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, Row, Col, Card, Table, Badge, Button, Form } from 'react-bootstrap';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalTransactions: 0 });
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [transactionSearchTerm, setTransactionSearchTerm] = useState('');

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
    
    const filteredUsers = users.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTransactions = transactions.filter(tx => {
        const searchTermLower = transactionSearchTerm.toLowerCase();
        const proposerName = tx.proposer?.fullName?.toLowerCase() || '';
        const requesterName = tx.request?.user?.fullName?.toLowerCase() || ''; // Assuming this path based on previous logic
        return proposerName.includes(searchTermLower) || requesterName.includes(searchTermLower);
    });

    return (
        <Container fluid className="dashboard-container">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <Row className="my-4 stat-cards-container">
                <Col md={6}>
                    <Card className="mb-3 stat-card glass-effect">
                        <Card.Body>
                            <Card.Title as="h3">Total Users</Card.Title>
                            <Card.Text as="p">{stats.totalUsers}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="mb-3 stat-card glass-effect">
                        <Card.Body>
                            <Card.Title as="h3">Total Transactions (Proposals)</Card.Title>
                            <Card.Text as="p">{stats.totalTransactions}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="align-items-center mb-3">
                <Col md={9}>
                    <h2>All Users</h2>
                </Col>
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>
            
            <div className="table-container glass-effect">
                <Table responsive className="dashboard-table">
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
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td data-label="ID">{user.id}</td>
                                <td data-label="Full Name">{user.fullName}</td>
                                <td data-label="Phone Number">{user.phoneNumber}</td>
                                <td data-label="Role"><Badge bg={user.role === 'ROLE_ADMIN' ? 'danger' : 'secondary'}>{user.role}</Badge></td>
                                <td data-label="Actions">
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
            </div>

            <Row className="align-items-center mb-3 mt-5">
                <Col md={9}>
                    <h2>All Transactions (Proposal History)</h2>
                </Col>
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Search by name..."
                        value={transactionSearchTerm}
                        onChange={e => setTransactionSearchTerm(e.target.value)}
                    />
                </Col>
            </Row>

            <div className="table-container glass-effect">
                <Table responsive className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Request Made By</th>
                            <th>Proposal Made By</th>
                            <th>Status</th>
                            <th>Meeting Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {transactions.map(tx => (
                        <tr key={tx.id}>
                             <td>{tx.receiver?.fullName || 'N/A'}</td>
                            <td>{tx.proposer?.fullName || 'N/A'}</td>
                            
                            <td><Badge>{tx.status}</Badge></td>
                            <td>{new Date(tx.meetingTime).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default AdminDashboard;