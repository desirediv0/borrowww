import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import CibilData from './pages/CibilData';
import Dashboard from './pages/Dashboard';
import Loans from './pages/Loans';
import Login from './pages/Login';
import Users from './pages/Users';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Users />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/cibil-data"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CibilData />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/loans"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Loans />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
