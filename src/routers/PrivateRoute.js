import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
  const { logged } = useSelector((state) => state.user);

  return logged ? children : <Navigate to='/auth/login' />;
};

export default PrivateRoute;
