import React, { useState, useEffect } from "react";
import TopNav from "./GlobalComponents/TopNav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import footer from "./GlobalComponents/footer";
import Categories from "./ShoppingConfiguration/categories";
import AccountList from "./SkincareChallenge/SCAccountList/AccountList";
import AccountEdit from "./SkincareChallenge/SCAccountList/AccountEdit";
import './App.css'

function App() {
  // SAMPLE USER VALIDATION (Needs to be created)---------->
  // Currently defaulted to true..needs to default to false once authentication is set up
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // function to verify if the user is logged in.. once user is verified, this function should call the setAuth function to return true
  const isAuthCheck = () => {
    setAuth(true);
  };
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    isAuthCheck();
  }, []);

  // <------------ END SAMPLE USER VALIDATION SECTION

  return (
    <div className='app'>
      <Switch>
        <Route
          path="/Dashboard"
          render={(props) =>
            isAuthenticated ? <Dashboard /> : <Redirect to="/login" />
          }
        />
      <Route  path="/Permissions" component={Categories} />
      <Route exact path="/" component={Home} />
      <Route  path="/login" component={Login} />
      <Route
        path="/Skincare-Challenge-Accounts"
        component={AccountList}
      />
      <Route
        path="/Skincare-Challenge-Account-Edit/:accountid"
        component={AccountEdit}
      />
       </Switch>
    </div>
  );
}

export default App;
