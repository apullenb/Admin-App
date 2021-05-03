import React, { useState, useEffect } from "react";
import TopNav from './global components/TopNav'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
  import Login from './Login';
  import Home from './components/home';
  import Dashboard from './Dashboard';
import footer from './components/footer'
import Categories from "./components/categories";

function App() {
   
   
   
// SAMPLE USER VALIDATION (Needs to be created)---------->

    const [isAuthenticated, setIsAuthenticated] = useState(true);

    // function to verify if the user is logged in.. once user is verified, this function should call the setAuth function to return true
const isAuthCheck = () => {
    setAuth(true)
}
const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    isAuthCheck();
  }, []);


  // <------------ END SAMPLE USER VALIDATION SECTION


   

    return (
        <div>
           
            <Switch>
          <Route
           exact path='/Dashboard'
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Redirect to='/login' />
                )
              }
            />  
            
            
           
           
          </Switch>
          <Route exact path="/Permissions" component={Categories} />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />

       
        </div>
    )
}

export default App;
