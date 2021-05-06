import React, { useState, useEffect } from "react";
import PageWrapper from "../../GlobalComponents/PageWrapper";
import data from "./testaccountsdata";
import "./AccountList.css";
import Accounts from "./Accounts";

function AccountList() {
  const [users, setUsers] = useState("");
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [filteredUsers, setFilteredUseres] = useState([]);
  const [message, setMessage] = useState("");
  const getUsers = () => {
    // needs to be created once the backend for this is finished
    setUsers(data);
    console.log(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e, cat) => {
     
    setFilter(e.target.value);
    setCategory(cat);
    filterUsers();
  };

  const filterUsers = () => {
    setMessage('')
    users.forEach((user) => {
      if (category !== "" && user[category].includes(filter)) {
        setFilteredUseres([user]);
      } else 
      setMessage("No Results Found");
    });
   setMessage('')
  };

  return (
    <div>
      <PageWrapper>
        <h1>Skincare Challenge Accounts</h1>
        <button className="add-account-btn">+ New Account</button>
        <section className="account-table">
          <table>
            <tr>
              <th id="filter">
                <input
                  type="text"
                  defaultValue="Account ID"
                  onChange={(e) => handleChange(e, "accountId")}
                />
              </th>
              <th id="filter">
                <input type="text" defaultValue="Name" />
              </th>
              <th id="filter">
                <input type="text" defaultValue="Email" />
              </th>
              <th id="filter">
                <input type="text" defaultValue="Ambassador ID" />
              </th>
              <th id="filter">
                <input type="text" defaultValue="Last Login" />
              </th>
              <th id="filter">
                <select id="filter">
                  <option selected value="Challenge">
                    Challenge
                  </option>
                  <option value="2020 Q3">2020 Q3</option>
                  <option value="2020 Q4">2020 Q3</option>
                  <option value="2021 Q1">2021 Q1</option>
                  <option value="2021 Q2">2021 Q2</option>
                  <option value="2021 Q3">2021 Q3</option>
                </select>
              </th>
              <th></th>
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

            <h3>{message}</h3>
            {users !== "" && filteredUsers.length == 0
              ? users.map((user) => {
                  return <Accounts users={user} />;
                })
              : filteredUsers.length &&
                filteredUsers.map((user) => {
                  return <Accounts users={user} />;
                })}
          </table>
        </section>
        <section className="button-row">
          <button>{"< Prev"}</button>
          <button>{"Next >"}</button>
        </section>
      </PageWrapper>
    </div>
  );
}

export default AccountList;
