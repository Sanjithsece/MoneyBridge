import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRequest from './pages/CreateRequest';
import MyRequests from './pages/MyRequests';
import MyProfile from './pages/MyProfile';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';

import UserDetails from './pages/UserDetails';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/create-request" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
        <Route path="/my-requests" element={<ProtectedRoute><MyRequests /></ProtectedRoute>} />
        <Route path="/my-profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/admin/users/:userId" element={<AdminRoute><UserDetails /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;