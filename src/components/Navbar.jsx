import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [unreadCount, setUnreadCount] = useState(0);
    
    let isAdmin = false;
    if (token) {
        try {
            isAdmin = jwtDecode(token).roles?.includes('ROLE_ADMIN');
        } catch (e) { /* ignore invalid token */ }
    }
    const fetchCount = useCallback(() => {
        if (token) {
            api.get('/notifications/unread-count')
                .then(res => setUnreadCount(res.data.count))
                .catch(console.error);
        }
    }, [token]);

    useEffect(() => {
        fetchCount();
                const intervalId = setInterval(fetchCount, 30000);

        return () => clearInterval(intervalId);
    }, [fetchCount]); 

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/">MoneyBridge</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        {token ? (
                            <>
                                {isAdmin && <Nav.Link as={Link} to="/admin/dashboard">Admin</Nav.Link>}
                                <Nav.Link as={Link} to="/my-requests" className="position-relative">
                                    Notifications
                                    {unreadCount > 0 && 
                                        <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle" style={{ fontSize: '0.6em' }}>
                                            {unreadCount}
                                        </Badge>
                                    }
                                </Nav.Link>
                            
                                <Nav.Link as={Link} to="/create-request">Create Request</Nav.Link>
                                <Nav.Link as={Link} to="/my-profile">My Profile</Nav.Link>
                                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;