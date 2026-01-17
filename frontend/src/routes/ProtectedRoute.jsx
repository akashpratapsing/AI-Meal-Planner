import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Custom hook from your context

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;

  const roles = user.roles || [];

  if (roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/admin" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default ProtectedRoute;
