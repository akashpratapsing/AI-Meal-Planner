import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserPanel from "../pages/UserPanel";

const RoleBasedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/auth" replace />;

  const userRoles = user.roles || [];
  console.log(userRoles);

  const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

  return hasAccess ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default RoleBasedRoute;
