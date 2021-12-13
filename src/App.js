/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
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
  },
  {
    path: '/Shopping/Countries',
    exact: true,
    component: ShoppingCountries,
  },
  {
    path: '/Shopping/Kits',
    exact: true,
    component: ShoppingKits,
  },
  {
    path: '/Shopping/Categories',
    exact: true,
    component: ShoppingCategories,
  },
  {
    path: '/Shopping/Products',
    exact: true,
    component: ShoppingProducts,
  },
  {
    exact: true,
    path: '/Challenge/Accounts',
    component: AccountList,
  },
  {
    exact: true,
    path: '/Challenge/Glow-Submission/:submissionId',
    component: GCEntryEdit,
  },
  {
    exact: true,
    path: '/Challenge/Glow-Entry/:accountid',
    component: GlowEntry,
  },
  {
    exact: true,
    path: '/Challenge/Accounts/:accountid',
    component: AccountEdit,
  },
  {
    exact: true,
    path: '/Challenge/Entries',
    component: EntryList,
  },
  {
    exact: true,
    path: '/Challenge/Glow-Entries',
    component: GlowEntryList,
  },
  {
    exact: true,
    path: '/Challenge/Entry/:entryId',
    component: EntryEdit,
  },
  {
    exact: true,
    path: '/Coa/documents/:productID',
    component: COADocument,
  },
  {
    exact: true,
    path: '/COA/edit/:productID/:coaDocumentID',
    component: EditCOA,
  },
  {
    exact: true,
    path: '/COAs',
    component: COAProductList,
  },
  {
    exact: true,
    path: '/Events',
    component: Events,
  },
  {
    exact: true,
    path: '/Incentive',
    component: Incentive,
  },
  {
    exact: true,
    path: '/Permissions',
    component: Permissions,
  },
  {
    exact: true,
    path: '/COA/:productID',
    component: COA,
  },
  {
    exact: true,
    path: '/Settings/users/add',
    component: UserAuthorizationStatusAddEdit,
  },
  {
    exact: true,
    path: '/Settings/users/edit/:userID',
    component: UserAuthorizationStatusAddEdit,
  },
  {
    exact: true,
    path: '/Settings/users',
    component: UserAuthorizationStatusTable,
  },
  {
    exact: true,
    path: '/StarPoint/',
    component: StarPointAccountList,
  },
  {
    exact: true,
    path: '/StartPoint/Edit/:inventoryId',
    component: EditStarPoint,
  },
];
const client = new ApolloClient({
  uri:config.ORDERAPIURL,
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
        <Switch>
          {/* <Route exact path='/login' component={Login} /> */}
          {allRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  // localStorage.getItem('Token') ? (
                  //   <>
                     return <Page>
                        <route.component {...props} />
                      </Page>
                     }
                    //</>
                 // ) : (
                   // <Redirect to={'/login'} />
                    }
                   />

                  )
                
              ///>
            //);
          })}
        </Switch>
      </div>
    </ApolloProvider>
  );
}

export default App;
