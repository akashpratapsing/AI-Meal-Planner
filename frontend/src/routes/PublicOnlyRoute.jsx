import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicOnlyRoute = () => {
  const { user } = useAuth();

  // If logged in → redirect away from auth pages
  if (user) {
    const roles = user.roles || [];

    if (roles.includes("ROLE_ADMIN")) {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicOnlyRoute;
