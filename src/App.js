/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import './App.scss';
import Login from './Login';
import Dashboard from './Pages/Dashboard';

import AccountList from './SkincareChallenge/SCAccountList/AccountList';
import AccountEdit from './SkincareChallenge/SCAccountList/AccountEdit';
import EntryList from './SkincareChallenge/SCEntryList/EntryList';
import EntryEdit from './SkincareChallenge/EntryEdit';

import EditCOA from './COA/EditCOA';
import AddCOA from './COA/AddCOA';

import ShoppingCountries from './ShoppingConfiguration/countries/countries';
import ShoppingKits from './ShoppingConfiguration/kits/kits';
import ShoppingProducts from './ShoppingConfiguration/product/products';
import ShoppingCategories from './ShoppingConfiguration/categories';
import StarPointAccountList from './StartPoint/StarPointAccountList';
import EditStarPoint from './StartPoint/EditStarPoint';

import Events from './Events/EventList';
import Incentive from './Incentive/IncentiveList';
import Permissions from './Permissions/PermissionList';

import Page from './GlobalComponents/PageWrapper';
import { APP_STARTED } from './redux/actions/app/appActionTypes';
import COA from './COA/COA';
import COAProductList from './COA/COAProductList';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import COADocument from './COA/COADocuments';
import UserAuthorizationStatusTable from './User/UserAuthorizationStatusTable';
import UserAuthorizationStatusAddEdit from './User/UserAuthorizationStatusAddEdit';
import GlowEntryList from './GlowChallenge/GlowEntryList';
import GCEntryEdit from './GlowChallenge/GCEntryEdit';
import GlowEntry from './GlowChallenge/GlowEntry';

import config from './config/env-urls';
import { SkincareAdminPermissions } from './redux/actions/Skincare/skincareActions';
const allRoutes = [
  {
    path: '/',
    exact: true,
    component: Dashboard,
    protected: false,
  },
  {
    path: '/Shopping/Countries',
    exact: true,
    component: ShoppingCountries,
    protected: true,
  },
  {
    path: '/Shopping/Kits',
    exact: true,
    component: ShoppingKits,
    protected: true,
  },
  {
    path: '/Shopping/Categories',
    exact: true,
    component: ShoppingCategories,
    protected: true,
  },
  {
    path: '/Shopping/Products',
    exact: true,
    component: ShoppingProducts,
    protected: true,
  },
  {
    exact: true,
    path: '/Challenge/Accounts',
    component: AccountList,
    protected: true,
  },
  {
    exact: true,
    path: '/Challenge/Glow-Submission/:submissionId',
    component: GCEntryEdit,
    protected: true,
  },
  {
    exact: true,
    path: '/Challenge/Glow-Entry/:accountid',
    component: GlowEntry,
    protected: true,
  },
  {
    exact: true,
    path: '/Challenge/Accounts/:accountid',
    component: AccountEdit,
    protected: true,
  },
  {
    exact: true,
    path: '/Challenge/Entries',
    component: EntryList,
    protected: true,
  },
  {
    exact: true,
    path: '/Challenge/Glow-Entries',
    component: GlowEntryList,
    protected: true,
  },
  {
    exact: true,
    path: '/Challenge/Entry/:entryId',
    component: EntryEdit,
    protected: true,
  },
  {
    exact: true,
    path: '/Coa/documents/:productID',
    component: COADocument,
    protected: true,
  },
  {
    exact: true,
    path: '/COA/edit/:productID/:coaDocumentID',
    component: EditCOA,
    protected: true,
  },
  {
    exact: true,
    path: '/COAs',
    component: COAProductList,
    protected: true,
  },
  {
    exact: true,
    path: '/Events',
    component: Events,
    protected: true,
  },
  {
    exact: true,
    path: '/Incentive',
    component: Incentive,
    protected: true,
  },
  {
    exact: true,
    path: '/Permissions',
    component: Permissions,
    protected: true,
  },
  {
    exact: true,
    path: '/COA/:productID',
    component: COA,
    protected: true,
  },
  {
    exact: true,
    path: '/Settings/users/add',
    component: UserAuthorizationStatusAddEdit,
    protected: true,
  },
  {
    exact: true,
    path: '/Settings/users/edit/:userID',
    component: UserAuthorizationStatusAddEdit,
    protected: true,
  },
  {
    exact: true,
    path: '/Settings/users',
    component: UserAuthorizationStatusTable,
    protected: true,
  },
  {
    exact: true,
    path: '/StarPoint',
    component: StarPointAccountList,
    protected: true,
  },
  {
    exact: true,
    path: '/StartPoint/Edit/:inventoryId',
    component: EditStarPoint,
    protected: true,
  },
];
const client = new ApolloClient({
  uri: config.ORDERAPIURL,
});

function App() {
  // SAMPLE USER VALIDATION (Needs to be created)---------->
  // Currently defaulted to true..needs to default to false once authentication is set up
  const dispatch = useDispatch();
  // function to verify if the user is logged in.. once user is verified, this function should call the setAuth function to return true

  useEffect(() => {
    dispatch({ type: APP_STARTED });

    //dispatch(SkincareAdminPermissions())
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className='app'>
        <Page>
          <Switch>
            {allRoutes.map((route, index) => {
              return route.protected ? (
                <PrivateRoute key={index} path={route.path} exact={route.exact} component={route.component} />
              ) : (
                <Route key={index} path={route.path} exact={route.exact} render={(props) => <route.component {...props} />} />
              );
            })}
          </Switch>
        </Page>
      </div>
    </ApolloProvider>
  );
}

export default App;
