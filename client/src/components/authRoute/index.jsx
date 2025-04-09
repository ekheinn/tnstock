import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ isAuthenticated, loading }) => {
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
