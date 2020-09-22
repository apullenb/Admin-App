import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';
import Home from './components/home';
import Products from './components/product/products';
import Categories from './components/categories';
import './App.css';
import Styled from 'styled-components';


const SideBarTitleWrapper = Styled.div `
  font-size:25px;
  color:white;
  bottom-border:2px solid black;
`


class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      isLoading:false
    }
  }


   routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <SideBarTitleWrapper>Home</SideBarTitleWrapper>,
      main: () => <Home/>
    },
    {
      path: "/categories",
      sidebar: () => <SideBarTitleWrapper>Categories</SideBarTitleWrapper>,
      main: () => <Categories/>
    },
    {
      path: "/products",
      sidebar: () => <SideBarTitleWrapper>Products</SideBarTitleWrapper>,
      main: () => <Products handlegetAllProducts= {this.handlegetAllProducts} products={this.state.products} isLoading={this.state.isLoading}/>
    }
  ];

  componentDidMount(){
    this.handlegetAllProducts();
  }

  handlegetAllProducts = () =>{

    this.setState({
      isLoading:true
    })

      axios.get('http://localhost:4000/api/products')
      .then(res => {
          this.setState({
              products: res.data
          }); 
      })
      .catch(error => {
        console.log("There was an error fetching products", error);
      })
      .finally(()=>{
        this.setState({
          isLoading:false
        })
      })
  }
  

render(){
  return (
    <div className="App">

  <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "15%",
            height:"100vh",
            background: "#343a40"
          }}
        >
          <Switch>
            {this.routes.map((route, index) => (
              // You can render a <Route> in as many places
              // as you want in your app. It will render along
              // with any other <Route>s that also match the URL.
              // So, a sidebar or breadcrumbs or anything else
              // that requires you to render multiple things
              // in multiple places at the same URL is nothing
              // more than multiple <Route>s.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.sidebar />}
              />
            ))}
          </Switch>

          <ul style={{ listStyleType: "none", padding: 0,}}>
            <li className='side-nav-item' >
              <NavLink exact to="/" activeClassName="selected">Home</NavLink>
            </li>
            <li className='side-nav-item'>
              <NavLink to="/categories" activeClassName="selected">Categories</NavLink>
            </li>
            <li className='side-nav-item'>
              <NavLink to="/products" activeClassName="selected">Products</NavLink>
            </li>
          </ul>

        </div>

        <div style={{ flex: 1, width:'75%', padding: "10px" }}>
          <Switch>
            {this.routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>

    </div>
  );
  }
};

export default App;

