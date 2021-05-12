import React, { useState, useEffect } from "react";
import PageWrapper from "../../GlobalComponents/PageWrapper";

import "./AccountList.scss";
import Accounts from "./Accounts";
import axios from 'axios';
import BASEURL from '../../config/config'
import Pagination from "./Pagination";

function AccountList() {
  const [users, setUsers] = useState("");
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const getUsers = async () => {
    try{
     const requestOptions = {
        method: 'GET',
      };
    const response = await fetch(`${BASEURL}/api/challenge/all-users?perPage=25&pageNo=1&orderBy=users.id`, requestOptions)
    console.log('response', response);
   
    const data = await response.json();
    setUsers(data.data);
    console.log(data);
    
    } catch (err){
      console.error(err.message)
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log(users)
  const handleChange = (e, cat) => {
    setFilter(e.target.value);
    setCategory(cat);
    // Send category and filter to the backend as parameters
    // Set the response to users
    // setUsers(response)
    // If no results are found, set message to "no results"
  };

  const handlePrevPage = () => {
    // send request to backend
    // save response to users with setUsers()
  };

  const handleNextPage = () => {
    // send request to backend
    // save response to users with setUsers()
  };

  return (
    <div>
      <PageWrapper>
        <h1>Skincare Challenge Accounts</h1>
        <section className="account-table">
          <table>
            <tr>
              <th id="filter">
                <input
                  type="text"
                  defaultValue="Account ID"
                  onChange={(e) => handleChange(e, "id")}
                />
              </th>
              <th id="filter">
                <input
                  type="text"
                  defaultValue="Name"
                  onChange={(e) => handleChange(e, "name")}
                />
              </th>
              <th id="filter">
                <input
                  type="text"
                  defaultValue="Email"
                  onChange={(e) => handleChange(e, "email")}
                />
              </th>
              <th id="filter">
                <input
                  type="text"
                  defaultValue="Ambassador ID"
                  onChange={(e) => handleChange(e, "ambassador_id")}
                />
              </th>
              <th id="filter">
                <input
                  type="text"
                  defaultValue="Last Login"
                  onChange={(e) => handleChange(e, "lastLogin")}
                />
              </th>
              <th id="filter">
                <select id="filter">
                  <option
                    selected
                    value="Challenge"
                    onChange={(e) => handleChange(e, "lastChallenge")}
                  >
                    Challenge
                  </option>
                  <option value="2020 Q3">2020 Q3</option>
                  <option value="2020 Q4">2020 Q3</option>
                  <option value="2021 Q1">2021 Q1</option>
                  <option value="2021 Q2">2021 Q2</option>
                  <option value="2021 Q3">2021 Q3</option>
                </select>
              </th>
              <th id="filter">
                <button className="add-account-btn">+ New Account</button>
              </th>
            </tr>
            <tr>
              <th className="head">Account ID</th>
              <th className="head">Name</th>
              <th className="head">Email</th>
              <th className="head">Ambassador ID </th>
              <th className="head">Last Login </th>
              <th className="head">Last Challenge </th>
              <th className="head">Actions </th>
            </tr>
            {users.length > 1 &&
              users.map((user) => {
                return <Accounts users={user} />;
              })}
          </table>
          <h3>{message}</h3>
        </section>
        <section className="button-row">
          <button onClick={handlePrevPage}>{"< Prev"}</button>
          <button onClick={handleNextPage}>{"Next >"}</button>
        </section>
      </PageWrapper>
      {/* <Pagination /> */}
    </div>
  );
}

export default AccountList;



