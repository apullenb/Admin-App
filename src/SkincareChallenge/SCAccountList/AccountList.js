import React, { useState, useEffect } from "react";

import "./AccountList.scss";
import config from "../../config/env-urls";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import styled from 'styled-components';

function AccountList() {
  const [users, setUsers] = useState("");
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageOptions, setPageOptions] = useState([10, 15, 20]);

  const getUsers = async (perPage = 10, pageNo = 1) => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `${config.SKINCAREBASEURL}/api/challenge/all-users?perPage=${perPage}&pageNo=${pageNo}&orderBy=users.id`,
        requestOptions
      );
      console.log("response", response);

      const data = await response.json();
      setUsers(data.data);
      console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  console.log(users);
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
        <h1>Skincare Challenge Accounts</h1>
        <AccountTable>
          <table>
            {/* <tr>
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
            </tr> */}
            <thead>
              <tr>
                <th className="head">Account ID</th>
                <th className="head">Name</th>
                <th className="head">Email</th>
                <th className="head">Ambassador ID </th>
                <th className="head">Last Login </th>
                <th className="head">Last Challenge </th>
                <th className="head">Actions </th>
              </tr>
            </thead>
            <tbody>
              {users && users.length > 1 && users.map((user, i) => {
                return (
                  <tr key={i} id="row">
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.ambassadorId}</td>
                    <td>{user.lastLoginDate}</td>
                    <td>{user.lastChallenge}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/Challenge/Account/${user.id}`,
                          state: user,
                        }}
                      >
                        <button id="edit">Edit</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <h3>{message}</h3>
        </AccountTable>

        <Pagination getusers={getUsers} />
    </div>
  );
}

export default AccountList;

const AccountTable = styled.div`
  padding: 1px;
  margin: 0;

  table {
    width: 100%;
    
     tr {
      &:nth-child(even) {
        background: #F4FAFE;
      }
      
      td {
        padding: 5px 0;
      }
    }
  }

  .head {
    font-size: 18px;
    font-weight: 400;
    color: rgb(94, 93, 93);
    margin: 1px 1vw;
    padding: 5px 1vw;
    border-bottom: 1px solid #094a8a;
  }
`
