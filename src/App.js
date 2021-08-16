/* eslint-disable react-hooks/exhaustive-deps */
import './App.scss';
import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import './App.scss'
import Login from "./Login";
import Dashboard from "./Pages/Dashboard";

import AccountList from "./SkincareChallenge/SCAccountList/AccountList";
import AccountEdit from "./SkincareChallenge/SCAccountList/AccountEdit";
import EntryList from "./SkincareChallenge/SCEntryList/EntryList";
import EntryEdit from "./SkincareChallenge/EntryEdit";

import EditCOA from "./COA/EditCOA";
import AddCOA from "./COA/AddCOA";

import ShoppingCountries from "./ShoppingConfiguration/countries/countries";
import ShoppingKits from "./ShoppingConfiguration/kits/kits";
import ShoppingProducts from "./ShoppingConfiguration/product/products";
import ShoppingCategories from "./ShoppingConfiguration/categories";

import Events from './Events/EventList';
import Incentive from './Incentive/IncentiveList';
import Permissions from './Permissions/PermissionList';

import Page from './GlobalComponents/PageWrapper'
import { APP_STARTED } from "./redux/actions/app/appActionTypes";
import COA from './COA/COA';
import COAProductList from './COA/COAProductList';
import ApolloClient from  'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import COADocument from './COA/COADocuments';
import UserAuthorizationStatusTable from './User/UserAuthorizationStatusTable';
import UserAuthorizationStatusEdit from './User/UserAuthorizationStatusEdit';


const client = new ApolloClient({
  uri: 'https://zorderapidev.azurewebsites.net/graphql'
})

function App() {

  // SAMPLE USER VALIDATION (Needs to be created)---------->
  // Currently defaulted to true..needs to default to false once authentication is set up
  const dispatch = useDispatch();
  //const { fetching } = useSelector(state => state.app);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // function to verify if the user is logged in.. once user is verified, this function should call the setAuth function to return true
  const isAuthCheck = () => {
    setAuth(true);
  };
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    dispatch({type:APP_STARTED}) 
  }, [])

  useEffect(() => {
    isAuthCheck();
  }, []);

  // <------------ END SAMPLE USER VALIDATION SECTION

  return (
    <ApolloProvider client={client}>
    <div className='app'>     
      <Page >
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />

          <Route path="/Shopping/Countries" component={ShoppingCountries} />
          <Route path="/Shopping/Kits" component={ShoppingKits} />
          <Route path="/Shopping/Categories" component={ShoppingCategories} />
          <Route path="/Shopping/Products" component={ShoppingProducts} />

          <Route exact path="/Challenge/Accounts" render={(props) => isAuthenticated ? <AccountList /> : <Redirect to="/login" /> } />
          <Route path="/Challenge/Accounts/:accountid" component={AccountEdit} />
          <Route path="/Challenge/Entries" component={EntryList} />
          <Route path="/Challenge/Entry/:entryId" component={EntryEdit} />

          <Route path="/COA/edit/:productID/:coaDocumentID" component={EditCOA} />
          <Route path="/COA/add/:productID/" component={AddCOA} />
          <Route path="/Coa/documents/:productID" component={COADocument}/>
          <Route path="/COAs" component={COAProductList} />
          <Route path="/Events" component={Events} />
          <Route path="/Incentive" component={Incentive} />
          <Route path="/Permissions" component={Permissions} />
          <Route path="/COA/:productID" component={COA}/>

          <Route exact path="/Settings/users/edit/:userID" component={UserAuthorizationStatusEdit}/>
          <Route path="/Settings/users" component={UserAuthorizationStatusTable}/>

        </Switch>       
       </Page>
    </div>
    </ApolloProvider>
  );
}

export default App;
