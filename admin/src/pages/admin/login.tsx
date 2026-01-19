
import AdminLoginContent from "./authcontent";
import { useAuth } from "../../contexts/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminLoginPage() {
    const { admin, loading } = useAuth();
    const location = useLocation();
    if (loading) return null;
    if (admin) {
        // If already logged in, redirect to dashboard or intended page
        const from = location.state?.from?.pathname || "/dashboard";
        return <Navigate to={from} replace />;
    }
    return <AdminLoginContent />;
}
