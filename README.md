# 💸 MoneyBridge

### Smart Campus Money Exchange Platform

MoneyBridge is a secure peer-to-peer money exchange platform designed for students within educational institutions. The platform enables users to create money exchange requests, connect with trusted users, coordinate meeting locations, receive notifications, and complete transactions safely and efficiently.

Built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), MoneyBridge aims to simplify financial interactions among students while ensuring transparency, security, and ease of use.

---

## 🎯 Problem Statement

Students often encounter situations where they need immediate cash, digital payments, or financial assistance from peers. Traditional methods involve manually searching for someone willing to exchange money, which can be time-consuming and unreliable.

MoneyBridge solves this problem by providing a centralized platform where students can create exchange requests, discover interested users, arrange meeting locations, and complete exchanges securely.

---

## 🚀 Features

### 👤 User Management

* User Registration and Login
* Secure JWT Authentication
* Profile Management
* Email Verification
* Role-Based Access Control

### 💰 Exchange Requests

* Create Money Exchange Requests
* View Available Requests
* Accept or Reject Requests
* Track Request Status
* Transaction History

### 📍 Campus Meeting Coordination

* Select Meeting Locations
* Propose Meeting Times
* Confirm Exchange Points
* Manage Exchange Scheduling

### 🔔 Notification System

* Request Notifications
* Meeting Reminders
* Status Updates
* Exchange Alerts

### 🔒 Security Features

* Password Encryption
* JWT Authentication
* Protected API Routes
* Secure Data Storage

---

## 🏗️ Technology Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* JWT Authentication
* RESTful APIs

### Database

* MongoDB
* Mongoose ODM

### Development Tools

* Git & GitHub
* VS Code
* Postman

---

## 📂 Project Structure

```text
moneybridge/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── exchangeController.js
│   │   ├── meetingController.js
│   │   └── notificationController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── ExchangeRequest.js
│   │   ├── MeetingProposal.js
│   │   ├── Notification.js
│   │   └── CampusLocation.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── exchangeRoutes.js
│   │   ├── meetingRoutes.js
│   │   └── notificationRoutes.js
│   │
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── redux/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── SRS.md
│   ├── API_Documentation.md
│   └── System_Design.md
│
└── README.md
```

---

## ⚙️ Installation Guide

### Prerequisites

Before running the project, ensure the following are installed:

* Node.js (v18 or later)
* MongoDB Community Edition or MongoDB Atlas
* Git

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sanjithsece/MoneyBridge.git
cd MoneyBridge
```

---

## 2️⃣ Backend Setup

Navigate to backend folder:

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=8080

MONGO_URI=mongodb://localhost:27017/moneybridge

JWT_SECRET=your_super_secret_key

FRONTEND_URL=http://localhost:5173
```

Run the backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:8080
```

---

## 3️⃣ Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🔐 Authentication Flow

```text
User Registration
       │
       ▼
Email Verification
       │
       ▼
User Login
       │
       ▼
JWT Token Generation
       │
       ▼
Protected Routes Access
```

---

## 🔄 Money Exchange Workflow

```text
Create Exchange Request
           │
           ▼
Browse Available Requests
           │
           ▼
Accept Request
           │
           ▼
Schedule Meeting
           │
           ▼
Confirm Exchange
           │
           ▼
Complete Transaction
```

---

## 🗄️ MongoDB Collections

### Users

Stores user profile information and authentication data.

### ExchangeRequests

Stores exchange request details including amount, status, and participants.

### MeetingProposals

Stores meeting schedules and location information.

### Notifications

Stores alerts, reminders, and request updates.

### CampusLocations

Stores predefined meeting locations within the campus.

---

## 📡 API Modules

### Authentication APIs

* Register User
* Login User
* Verify Email
* Reset Password

### Exchange APIs

* Create Request
* View Requests
* Accept Request
* Update Status

### Meeting APIs

* Create Meeting Proposal
* Update Meeting Status
* View Scheduled Meetings

### Notification APIs

* Fetch Notifications
* Mark as Read
* Delete Notifications

---

## 📊 System Architecture

```text
                 User
                   │
                   ▼
         React + Vite Frontend
                   │
                   ▼
            Express.js API
                   │
 ┌─────────────────┼─────────────────┐
 │                 │                 │
 ▼                 ▼                 ▼
Authentication   Exchange       Notifications
 Service         Service          Service
 │                 │                 │
 └─────────────────┼─────────────────┘
                   │
                   ▼
               MongoDB
```

---

## 🌟 Future Enhancements

* Mobile Application
* UPI Payment Integration
* Real-Time Chat System
* QR Code Verification
* AI-Based User Matching
* Push Notifications
* Multi-Campus Support
* Analytics Dashboard

---

## 👨‍💻 Author

### Sanjith S

Bachelor of Engineering
Computer and Communication Engineering

Sri Eshwar College of Engineering

GitHub: https://github.com/Sanjithsece

---

## ❤️ Vision

MoneyBridge aims to create a secure and convenient ecosystem for peer-to-peer financial interactions within educational institutions, helping students manage transactions efficiently while promoting trust and accessibility.
