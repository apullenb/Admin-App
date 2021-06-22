import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
   
      <section style={{ margin: "2% 6%" }}>
        <h2>Home / Landing Page</h2>
        <Link to="login">
          <button>Click to Login</button>
        </Link>

        <h4 style={{ marginTop: "3%" }}>
          
          To See the Logged in Dashboard, go to
        </h4>
        <p>
          <Link to="/Dashboard">
            <button>Dashboard</button>
          </Link>
        </p>
      </section>
  
  );
};

export default Home;
