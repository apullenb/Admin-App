import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as Auth from '../auth/Authorize';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { loggedIn } = useSelector((state) => state.app);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && !Auth.validateToken(Auth.aZAdminToken) ? (
          <RouteComponent {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

/*
  Two state in the login process must be checked: The Token that is in localstorage and it's validity as well as the redux login app state.
  This Protected route / middleware component ensure that all Protected routes are check as they are accessed, if there is a token in the localstorage via our service,
  if the use is logged in and then that can access the route. If not thee user is redirected to the Home page. In the event the user refreshes and closed the tab
  due to the redirec the Dashboard component will check to see if the Token is still valid in the localstorage and if they are logged out automatically log them in.
*/
