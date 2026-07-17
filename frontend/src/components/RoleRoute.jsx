import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleRoute({ children, role }) {

    const {

        user,

        profile,

        loading

    } = useAuth();

    if (loading) {

        return null;

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    if (profile?.role !== role) {

        return <Navigate to="/micuenta" replace />;

    }

    return children;

}

export default RoleRoute;