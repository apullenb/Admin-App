/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import config from "../config/env-urls";
import Pagination from "../GlobalComponents/Pagination";
import { Link } from "react-router-dom";
import styled from 'styled-components';

function EventList() {
  const [users, setUsers] = useState("");
  // const [filter, setFilter] = useState("");
  // const [category, setCategory] = useState("");
  const [message, setMessage] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [blank, setBlank] = useState(false);

  const pageOptions = [10, 15, 20];

  const getUsers = async (perPage=10, pageNo=1) => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(`${config.SKINCAREBASEURL}/api/challenge/all-users?perPage=${perPage}&pageNo=${pageNo}&orderBy=users.id`,requestOptions);
      const data = await response.json();
      setUsers(data.data);
      setBlank(!blank);
      setMessage(!message);
      setTotalUsers(data.totalRows);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);


  // const handleChange = (e, cat) => {
  //   setFilter(e.target.value);
  //   setCategory(cat);
  //   // Send category and filter to the backend as parameters
  //   // Set the response to users
  //   // setUsers(response)
  //   // If no results are found, set message to "no results"
  // };

  

  return (
    <PageWrapper>
        <h1>Skincare Challenge Accounts</h1>
        <EventsTable>
          <table>
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
            {users && users.length > 1 && <tbody>
              {users.map((user, i) => {
                return (
                  <tr key={i} id="row">
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}{blank}</td>
                    <td>{user.ambassadorId}</td>
                    <td>{user.lastLoginDate}</td>
                    <td>{user.lastChallenge}{message}</td>
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
            }
          </table>
          <h3>{message}</h3>
        </EventsTable>

        <Pagination getRows={getUsers} totalRows={totalUsers} pageOptions={pageOptions} />
    </PageWrapper>
  );
}

export default EventList;

const PageWrapper = styled.div`
  width: 1400px;
`;

const EventsTable = styled.div`
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
`;
