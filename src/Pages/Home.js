import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../GlobalComponents/PageWrapper";
import Logo from "../assets/Zilislogo.png";
import styled from "styled-components";
import Page from '../GlobalComponents/PageWrapper'

const Home = (props) => {
  return (
    <Page>
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
    </Page>
  );
};

export default Home;

const Top = styled.div`
  display: flex;
  justify-content: center;
  margin: 1% 3%;
  padding: 25px 1%;
  border-bottom: 3px solid #043769;
`;
