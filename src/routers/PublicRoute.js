import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PublicRoute = ({ children }) => {
  const { logged } = useSelector((state) => state.user);
  const lastPath = localStorage.getItem('lastPathChatApp') || '/';

  return !logged ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: lastPath,
      }}
    />
  );
};

export default PublicRoute;
