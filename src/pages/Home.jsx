import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { Container, Row, Col, Card, Button, Badge, Spinner } from 'react-bootstrap';
import ProposeMeetingModal from '../components/ProposeMeetingModal';

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const requestsRes = await api.get('/requests/open');
      setRequests(Array.isArray(requestsRes.data) ? requestsRes.data : []);
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    api.get('/users/me')
      .then(res => setCurrentUser(res.data))
      .catch(error => console.error('Failed to fetch user:', error));

    fetchRequests();
  }, [fetchRequests]);

  const handleProposeClick = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  }

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-3">
        <Col><h1>Open Exchange Requests</h1></Col>
        <Col className="text-end">
          <Button variant="outline-primary" onClick={fetchRequests} disabled={loading}>
            {loading ? 'Loading…' : 'Refresh'}
          </Button>
        </Col>
      </Row>
      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Row>
          {requests.filter(req => currentUser && req.user?.id !== currentUser.id).length > 0 ? (
            requests.map((req) => (
              currentUser && req.user && req.user.id !== currentUser.id && (
                <Col md={6} lg={4} key={req.id} className="mb-4">
                  <Card className="request-card">
                    <Card.Body>
                      <Card.Title>₹{req.amount}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        by {req.user.fullName}
                      </Card.Subtitle>

                      <Card.Text>
                        Wants to exchange their <strong>{req.haveType}</strong> for <strong>{req.needType}</strong>.
                        <br />
                        <small className="text-muted">Place: {req.locationHint}</small>
                      </Card.Text>
                      <Button variant="success" onClick={() => handleProposeClick(req)}>
                        Propose Meeting
                      </Button>
                    </Card.Body>
                    <Card.Footer>
                      <Badge bg={req.status === 'OPEN' ? 'primary' : 'secondary'}>{req.status}</Badge>
                    </Card.Footer>
                  </Card>
                </Col>
              )
            ))
          ) : (
            <p className="text-center w-100">No open requests from other users at the moment.</p>
          )}
        </Row>
      )}

      {selectedRequest && (
        <ProposeMeetingModal
          show={showModal}
          handleClose={handleCloseModal}
          request={selectedRequest}
          currentUser={currentUser}
        />
      )}
    </Container>
  );
};

export default Home;