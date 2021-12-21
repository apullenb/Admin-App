/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import './App.scss';
import Page from './GlobalComponents/PageWrapper';
import { APP_STARTED } from './redux/actions/app/appActionTypes';
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
import ShoppingCategories from './ShoppingConfiguration/Catagories/categories';
import StarPointAccountList from './StartPoint/StarPointAccountList';
import EditStarPoint from './StartPoint/EditStarPoint';

import Events from './Events/EventList';
import Incentive from './Incentive/IncentiveList';
import Permissions from './Permissions/PermissionList';

import COA from './COA/COA';
import COAProductList from './COA/COAProductList';
import COADocument from './COA/COADocuments';
import UserAuthorizationStatusTable from './User/UserAuthorizationStatusTable';
import UserAuthorizationStatusAddEdit from './User/UserAuthorizationStatusAddEdit';
import GlowEntryList from './GlowChallenge/GlowEntryList';
import GCEntryEdit from './GlowChallenge/GCEntryEdit';
import GlowEntry from './GlowChallenge/GlowEntry';

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
    component: ShoppingCountries,
    protected: true,
  },
  {
    path: '/Shopping/Kits',
    component: ShoppingKits,
    protected: true,
  },
  {
    path: '/Shopping/Categories',
    component: ShoppingCategories,
    protected: true,
  },
  {
    path: '/Shopping/Products',
    component: ShoppingProducts,
    protected: true,
  },
  {
    path: '/Challenge/Accounts',
    component: AccountList,
    protected: true,
  },
  {
    path: '/Challenge/Glow-Submission/:submissionId',
    component: GCEntryEdit,
    protected: true,
  },
  {
    path: '/Challenge/Glow-Entry/:accountid',
    component: GlowEntry,
    protected: true,
  },
  {
    path: '/Challenge/Accounts/:accountid',
    component: AccountEdit,
    protected: true,
  },
  {
    path: '/Challenge/Entries',
    component: EntryList,
    protected: true,
  },
  {
    path: '/Challenge/Glow-Entries',
    component: GlowEntryList,
    protected: true,
  },
  {
    path: '/Challenge/Entry/:entryId',
    component: EntryEdit,
    protected: true,
  },
  {
    path: '/Coa/documents/:productID',
    component: COADocument,
    protected: true,
  },
  {
    path: '/COA/edit/:productID/:coaDocumentID',
    component: EditCOA,
    protected: true,
  },
  {
    path: '/COAs',
    component: COAProductList,
    protected: true,
  },
  {
    path: '/Events',
    component: Events,
    protected: true,
  },
  {
    path: '/Incentive',
    component: Incentive,
    protected: true,
  },
  {
    path: '/Permissions',
    component: Permissions,
    protected: true,
  },
  {
    path: '/COA/:productID',
    component: COA,
    protected: true,
  },
  {
    path: '/Settings/users/add',
    component: UserAuthorizationStatusAddEdit,
    protected: true,
  },
  {
    path: '/Settings/users/edit/:userID',
    component: UserAuthorizationStatusAddEdit,
    protected: true,
  },
  {
    path: '/Settings/users',
    component: UserAuthorizationStatusTable,
    protected: true,
  },
  {
    path: '/StarPoint',
    component: StarPointAccountList,
    protected: true,
  },
  {
    path: '/StartPoint/Edit/:inventoryId',
    component: EditStarPoint,
    protected: true,
  },
];

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: APP_STARTED });
    dispatch(SkincareAdminPermissions());
  }, []);

  return (
    <div className='app'>
      <Page>
        <Switch>
          {allRoutes.map((route, index) => {
            return route.protected ? (
              <PrivateRoute key={index} path={route.path} component={route.component} />
            ) : (
              <Route key={index} path={route.path} exact={route.exact} render={(props) => <route.component {...props} />} />
            );
          })}
        </Switch>
      </Page>
    </div>
  );
}

export default App;
