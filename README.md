# BORROWWW - Credit Score Management System

A comprehensive credit score management system where users can check their CIBIL scores, apply for loans, and administrators can manage user applications and credit-related data.

## 🏗️ Project Structure

The project is divided into three main parts:

### 1. Client Application (Next.js)

- Located in `/client`
- Built with Next.js for optimal performance and SEO
- Features:
  - User authentication and profile management
  - CIBIL score checking interface
  - Loan application forms
  - Real-time application status tracking
  - Interactive dashboard for users
  - Responsive design for all devices

### 2. Admin Dashboard (React + Vite + TypeScript)

- Located in `/admin`
- Built with React, Vite, and TypeScript for robust admin controls
- Features:
  - Secure admin authentication
  - User management dashboard
  - CIBIL score management
  - Loan application processing
  - Analytics and reporting tools
  - Data export capabilities
  - User activity monitoring

### 3. Server (Node.js + Express)

- Located in `/server`
- Built with Node.js and Express for reliable backend operations
- Features:
  - RESTful API endpoints
  - Database management with PostgreSQL
  - Secure authentication system
  - File upload handling
  - Email notifications
  - Data validation and sanitization
  - Rate limiting and security measures

## 🚀 Key Features

1. **User Features**

   - CIBIL score checking
   - Loan application submission
   - Document upload
   - Application status tracking
   - Profile management
   - History viewing

2. **Admin Features**

   - User management
   - Application processing
   - CIBIL score management
   - Document verification
   - System configuration
   - Analytics dashboard

3. **Security Features**
   - Secure authentication
   - Data encryption
   - Role-based access control
   - Session management
   - Input validation
   - API security

## 🛠️ Technical Stack

### Client (Next.js)

- Next.js for frontend
- Tailwind CSS for styling
- SWR for data fetching
- Next Auth for authentication

### Admin (React + Vite)

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for UI
- React Query for data management
- React Router for navigation

### Server (Node.js)

- Express.js framework
- PostgreSQL with Prisma ORM
- JWT for authentication
- Express Validator
- Multer for file uploads

## 📦 Prerequisites

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm
- Git

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/desirediv0/borrowww
   cd borrowww
   ```

2. **Setup Client**

   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Setup Admin**

   ```bash
   cd admin
   npm install
   npm run dev
   ```

4. **Setup Server**
   ```bash
   cd server
   npm install
   # Set up your .env file
   npm run dev
   ```

## 🔧 Environment Variables

Create `.env` files in respective directories:

### Server

```env
DATABASE_URL=postgresql://user:password@localhost:5432/borrowww
JWT_SECRET=your_jwt_secret
```

### Client

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Admin

```env
VITE_API_URL=http://localhost:3000
```

## 📝 API Documentation

The API documentation is available at `/api/docs` when running the server locally.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- Frontend Development: Ritesh, Muskan
- Backend Development: Ritesh
- UI/UX Design: Muskan

## 📞 Support

For support, email desirediv008@gmail.com or create an issue in the repository.
