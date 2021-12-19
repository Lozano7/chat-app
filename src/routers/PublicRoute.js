import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PublicRoute = ({ children }) => {
  const { logged } = useSelector((state) => state.user);

  return !logged ? children : <Navigate to='/' />;
};

export default PublicRoute;
