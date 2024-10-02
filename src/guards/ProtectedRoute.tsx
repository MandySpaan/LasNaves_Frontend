import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./ProtectedRoute.css";

interface ProtectedRouteProps {
  requiredRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredRoles,
  children,
}) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { role } = authContext;

  if (requiredRoles.includes(role || "")) {
    return <>{children}</>;
  }

  return (
    <div className="protected-route">
      <h2>You need to be Admin to access this page.</h2>
      <p>
        Please <Link to="/login">login</Link> or go to <Link to="/">Home</Link>.
      </p>
    </div>
  );
};

export default ProtectedRoute;
