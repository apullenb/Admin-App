import './App.scss';
import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
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
import Countries from "./ShoppingConfiguration/countries/countries";
import Products from "./ShoppingConfiguration/product/products";
import Categories from './ShoppingConfiguration/categories';
import Kits from './ShoppingConfiguration/kits/kits';
import EntryEdit from "./SkincareChallenge/SCAccountList/EntryEdit";
import ShoppingCountries from "./ShoppingConfiguration/countries/countries";
import ShoppingKits from "./ShoppingConfiguration/kits/kits";
import ShoppingProducts from "./ShoppingConfiguration/product/products";
import ShoppingCategories from "./ShoppingConfiguration/categories";
import Page from './GlobalComponents/PageWrapper'
import { APP_STARTED } from "./redux/actions/app/appActionTypes";
import Home from './Pages/Home';

function App() {
  // SAMPLE USER VALIDATION (Needs to be created)---------->
  // Currently defaulted to true..needs to default to false once authentication is set up
  const dispatch = useDispatch();
  const { fetching } = useSelector(state => state.app);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // function to verify if the user is logged in.. once user is verified, this function should call the setAuth function to return true
  const isAuthCheck = () => {
    setAuth(true);
  };
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

useEffect(()=>{
  dispatch({type:APP_STARTED}) 
},[])


  useEffect(() => {
    isAuthCheck();
  }, []);

  // <------------ END SAMPLE USER VALIDATION SECTION

  return (

    <div className='app'>      
      <Page >
        <Switch>
        <Route exact path="/" component={Home} />
          {/* <Route exact path="/" render={(props) => isAuthenticated ? <Dashboard /> : <Redirect to="/login" /> } />         */}
          <Route path="/login" component={Login} />
          <Route path="/Shopping/Countries" component={ShoppingCountries} />
          <Route path="/Shopping/Kits" component={ShoppingKits} />
          <Route path="/Shopping/Categories" component={ShoppingCategories} />
          <Route path="/Shopping/Products" component={ShoppingProducts} />
          <Route path="/Challenge/Accounts" render={(props) => isAuthenticated ? <AccountList /> : <Redirect to="/login" /> } />
          <Route path="/Challenge/Account/:accountid" component={AccountEdit} />
          <Route path="/Challenge/Entry/:entryId" component={EntryEdit} />
          <Route path="/Events" render={(props) => isAuthenticated ? <AccountList /> : <Redirect to="/login" /> } />
          <Route path="/Incentive" render={(props) => isAuthenticated ? <AccountEdit /> : <Redirect to="/login" /> } />
          <Route path="/Permissions" render={(props) => isAuthenticated ? <Categories /> : <Redirect to="/login" /> } />
          <Route path="/countries" component={Countries} />
          <Route path='/products' component={Products} />
          <Route path="/categories" component={Categories} />
          <Route path="/kits" component={Kits} />
        </Switch>       
       </Page>
    </div>
  );
}

export default App;
