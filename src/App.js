import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Categories from "./ShoppingConfiguration/categories";
import AccountList from "./SkincareChallenge/SCAccountList/AccountList";
import AccountEdit from "./SkincareChallenge/SCAccountList/AccountEdit";
import Countries from "./ShoppingConfiguration/countries/countries";
import './App.css'
import Products from "./ShoppingConfiguration/product/products";
import { APP_STARTED } from "./redux/actions/app/appActionTypes";

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
  console.log("Test Action Dispatched")
  dispatch({type:APP_STARTED}) 
},[])


  useEffect(() => {
    isAuthCheck();
  }, []);

  // <------------ END SAMPLE USER VALIDATION SECTION

  return (
    <div className='app'>
      <Switch>
        <Route
          exact
          path="/Dashboard"
          render={(props) =>
            isAuthenticated ? <Dashboard /> : <Redirect to="/login" />
          }
        />
      </Switch>

      <Route exact path="/Permissions" component={Categories} />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route
        exact
        path="/Skincare-Challenge-Accounts"
        component={AccountList}
      />
      <Route
        exact
        path="/Skincare-Challenge-Account-Edit/:accountid"
        component={AccountEdit}
      />
      <Route path="/countries" component={Countries} />
      <Route path='/products' component={Products} />
    </div>
  );
}

export default App;
