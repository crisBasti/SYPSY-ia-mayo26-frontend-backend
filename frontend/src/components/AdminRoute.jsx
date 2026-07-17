import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {

    const {

        user,

        profile,

        loading

    } = useAuth();

    if (loading) {

        return null;

    }

    if (!user) {

        return <Navigate to="/login" />;

    }

    if (profile?.role !== "admin") {

        return <Navigate to="/micuenta" replace />;

    }

    return children;

}

export default AdminRoute;