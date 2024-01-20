
import { Redirect, Route } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const isAuthenticated = !!document.cookie;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          role ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
