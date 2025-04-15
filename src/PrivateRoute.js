import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('access_token'); 

  if (!token) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
