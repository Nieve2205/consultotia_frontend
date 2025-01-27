import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateAdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateAdminRoute;