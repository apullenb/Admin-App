import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './redux/reducers/index';
//Redux
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

//Azure AD
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './services/azureAD/authConfig';
const msalInstance = new PublicClientApplication(msalConfig);

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

//Apallo Client
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from '@apollo/client/link/context';
import config from './config/env-urls';
import * as Auth from './auth/Authorize';

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken(Auth.zilisAdminToken);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: config.ORDERAPIURL,
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <Provider store={store}>
          <MsalProvider instance={msalInstance}>
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </MsalProvider>
        </Provider>
      </ToastProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
