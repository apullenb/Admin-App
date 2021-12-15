/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import config from './config/env-urls';
import ApolloClient from 'apollo-boost';
import Login from './Login';
import Page from './GlobalComponents/PageWrapper';
import { APP_STARTED } from './redux/actions/app/appActionTypes';
import { ApolloProvider } from '@apollo/react-hooks';
import { SkincareAdminPermissions } from './redux/actions/Skincare/skincareActions';
import AllRoutes from './routes';

const client = new ApolloClient({
  uri:config.ORDERAPIURL,
});
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: APP_STARTED });
    dispatch(SkincareAdminPermissions())
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className='app'>
        <Switch>
          <Route exact path='/login' component={Login} />
          {AllRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) =>
                  localStorage.getItem('Token') ? (
                    <>
                      <Page>
                        <route.component {...props} />
                      </Page>
                    </>
                  ) : (
                    <Redirect to={'/login'} />
                  )
                }
              />
            );
          })}
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
