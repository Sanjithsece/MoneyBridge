import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRequest from './pages/CreateRequest';
import MyRequests from './pages/MyRequests';
import MyProfile from './pages/MyProfile';
import AdminDashboard from './pages/AdminDashboard';
import UserDetails from './pages/UserDetails';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // We will create this
import AdminRoute from './components/AdminRoute';
import { AuthProvider } from './context/AuthContext'; 


function App() {
  return (
    <AuthProvider>
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
          <Route path="/admin/users/:userId" element={<AdminRoute><UserDetails /></AdminRoute>} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
