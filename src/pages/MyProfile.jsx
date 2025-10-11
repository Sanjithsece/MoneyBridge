import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import emailjs from '@emailjs/browser';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [feedback, setFeedback] = useState({ from_name: '', from_email: '', message: '' });

    useEffect(() => {
        api.get('/users/me')
            .then(res => {
                setUser(res.data);
                setFeedback(prev => ({ ...prev, from_name: res.data.fullName }));
            })
            .catch(() => setError('Could not load user profile.'));
    }, []);

    const handleFeedbackChange = (e) => {
        setFeedback({ ...feedback, [e.target.name]: e.target.value });
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        
        setError('');
        setSuccess('');

        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(feedback.from_email)) {
            setError("Please enter a valid email address.");
            return; 
        }

        const serviceID = "service_vye4lad";
        const templateID = "template_ylu876k";
        const publicKey = "93w7Sw4tdlOjcDJbo";

        emailjs.send(serviceID, templateID, feedback, publicKey)
            .then((response) => {
                console.log("Email sent successfully:", response);
                setSuccess("Your message has been sent successfully!");
                setFeedback(prev => ({ ...prev, from_email: '', message: '' })); // Clear email and message fields
            }, (error) => {
                console.error("Error sending email:", error);
                setError("Failed to send message. Please try again.");
            });
    };

    if (!user) {
        return <Container className="text-center mt-5"><p>Loading profile...</p></Container>;
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="mb-4">
                        <Card.Header as="h3">My Profile</Card.Header>
                        <Card.Body className="text-center">
                            <Card.Title className="mt-3">{user.fullName}</Card.Title>
                            <Card.Text className="text-muted">{user.phoneNumber}</Card.Text>
                        </Card.Body>
                    </Card>

                    <Card className="mb-4">
                        <Card.Header as="h3">Report / Feedback</Card.Header>
                        <Card.Body>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Form onSubmit={handleFeedbackSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control type="text" name="from_name" value={feedback.from_name} onChange={handleFeedbackChange} required readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Your Email</Form.Label>
                                    <Form.Control type="email" name="from_email" placeholder="Enter your email for follow-up" value={feedback.from_email} onChange={handleFeedbackChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={5} name="message" placeholder="Your message, review, or report..." value={feedback.message} onChange={handleFeedbackChange} required />
                                </Form.Group>
                                <Button type="submit" variant="primary" className="w-100">Send Message</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4">
                        <Card.Header as="h3">How to Use & Our Motive</Card.Header>
                        <Card.Body>
                            <h5 className="card-subtitle mb-2">How It Works</h5>
                            <ul className="how-to-use-list">
                                <li>
                                    <strong>Create a Request:</strong> Need UPI for your cash? Post a request specifying the amount and a general location hint.
                                </li>
                                <li>
                                    <strong>Get Proposals:</strong> Other nearby users will see your request and send proposals to help you with the exchange.
                                </li>
                                <li>
                                    <strong>Accept & Connect:</strong> Review the proposals, accept the one that works for you, and coordinate to complete the exchange.
                                </li>
                            </ul>
                            
                            <hr />

                            <h5 className="card-subtitle mb-2 mt-3">Our Motive</h5>
                            <p>
                                In a world where digital payments and cash co-exist, we often find ourselves with one when we need the other. MoneyBridge was created to solve this simple, everyday problem by connecting people within a community. Our goal is to provide a fast, convenient, and peer-to-peer platform to bridge the gap between your physical and digital wallet, ensuring you're never stuck without the right form of money.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MyProfile;