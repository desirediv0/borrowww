import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLoginPage from './pages/admin/login';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import CreditCheckInquiries from './pages/CreditCheckInquiries';
import ContactInquiries from './pages/ContactInquiries';
import HomeLoanInquiries from './pages/HomeLoanInquiries';
import Tracking from './pages/Tracking';
import Referrals from './pages/Referrals';
import Users from './pages/Users';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<AdminLoginPage />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" replace />
                </ProtectedRoute>
              }
            />
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
              path="/credit-check-inquiries"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <CreditCheckInquiries />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact-inquiries"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ContactInquiries />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/home-loan-inquiries"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <HomeLoanInquiries />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracking"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Tracking />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/referrals"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <Referrals />
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
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
          <Toaster position="top-center" richColors />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

