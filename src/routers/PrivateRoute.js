import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
const PrivateRoute = ({ children }) => {
  const { logged } = useSelector((state) => state.user);
  const { pathname } = useLocation();

  localStorage.setItem('lastPathChatApp', pathname);

  return logged ? children : <Navigate to='/auth/login' />;
};

export default PrivateRoute;
