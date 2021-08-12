import React, { useState, useEffect } from "react";

import config from "../config/env-urls";
import Pagination from "../GlobalComponents/Pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserAuthorizationStatusHeader from "./UserAuthorizationStatusHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown} from "@fortawesome/fontawesome-free-solid";

const UserAuthorizationStatusTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  // const [filter, setFilter] = useState("");
  // const [category, setCategory] = useState("");
  const [message, setMessage] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [blank, setBlank] = useState(false);
  const [name, setName] = useState("");

  const pageOptions = [10, 15, 20];

  const getUsers = async (perPage = 10, pageNo = 1) => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `${config.SKINCAREBASEURL}/api/challenge/all-users?perPage=${perPage}&pageNo=${pageNo}&orderBy=users.id`,
        requestOptions
      );
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

  const handleFilterByName = (e) => {
    const { value } = e.target;

    const currentUsers = [...users];

    if (value === "") {
      setFilteredUsers(currentUsers);
      return;
    }

    const filteredUsers = currentUsers.filter((user) =>
      user.name.toUpperCase().includes(value.toUpperCase())
    );

    setFilteredUsers(filteredUsers);
  };

  const handleFilterByEmail = (e) => {
    const { value } = e.target;

    const currentUsers = [...users];

    if (value === "") {
      setFilteredUsers(currentUsers);
      return;
    }

    const filteredUsers = currentUsers.filter((user) =>
      user.email.toUpperCase().includes(value.toUpperCase())
    );

    setFilteredUsers(filteredUsers);
  };

  const currentUsers = filteredUsers.length > 0 ? filteredUsers : users;

  return (
    <div>
      <UserAuthorizationStatusHeader />
      <PermissionTable>
        <table>
          <thead>
            <tr>
              <th>
                <StyledInput
                  placeholder="First - Last Name"
                  style={{
                    width: "229px",
                    marginBottom: "15px",
                    marginLeft: "85px",
                  }}
                  onChange={handleFilterByName}
                />
              </th>
              <th>
                <StyledInput
                  placeholder="Email"
                  style={{
                    marginLeft: "225px",
                    width: "271px",
                    marginBottom: "15px",
                  }}
                  onChange={handleFilterByEmail}
                />
              </th>
            </tr>
            <tr>
              <th className="head">
                First - Last Name
                <span style={{ verticalAlign: "middle" }}>
                  <FontAwesomeIcon
                    style={{
                      marginLeft: '25px',
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    icon={faChevronDown}
                  />
                </span>
                <span
                style={{
                  verticalAlign: "middle",
                }}
                >
                  <FontAwesomeIcon
                    style={{
  
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    icon={faChevronUp}
                  />
                </span>
              </th>
              <th className="head">Email
              <span style={{ verticalAlign: "middle" }}>
                  <FontAwesomeIcon
                    style={{
                      marginLeft: '25px',
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    icon={faChevronDown}
                  />
                </span>
                <span
                style={{
                  verticalAlign: "middle",
                }}
                >
                  <FontAwesomeIcon
                    style={{
  
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    icon={faChevronUp}
                  />
                </span>
              </th>
              <th className="head">Last Accessed
              <span style={{ verticalAlign: "middle" }}>
                  <FontAwesomeIcon
                    style={{
                      marginLeft: '25px',
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    icon={faChevronDown}
                  />
                </span>
                <span
                style={{
                  verticalAlign: "middle",
                }}
                >
                  <FontAwesomeIcon
                    style={{
  
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    icon={faChevronUp}
                  />
                </span>
              </th>
              <th className="head">Actions
              <span style={{ verticalAlign: "middle" }}>
                  <FontAwesomeIcon
                    style={{
                      marginLeft: '25px',
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    icon={faChevronDown}
                  />
                </span>
                <span
                style={{
                  verticalAlign: "middle",
                }}
                >
                  <FontAwesomeIcon
                    style={{
  
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    icon={faChevronUp}
                  />
                </span>
              </th>
            </tr>
          </thead>
          {currentUsers && currentUsers.length > 0 && (
            <tbody>
              {currentUsers.map((user, i) => {
                return (
                  <tr key={i} id="row">
                    <td>{user.name}</td>
                    <td>
                      {user.email}
                      {blank}
                    </td>
                    <td>{user.lastLoginDate}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/Users/Edit/${user.id}`,
                          state: user,
                        }}
                      >
                        <button id="edit">Edit</button>
                      </Link>
                      |
                      <Link
                        to={{
                          pathname: `/Authorization/Account/${user.id}`,
                          state: user,
                        }}
                      >
                        <button id="edit">Delete</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </PermissionTable>
      <Pagination
        getRows={getUsers}
        totalRows={totalUsers}
        pageOptions={pageOptions}
      />
    </div>
  );
};

const PermissionTable = styled.div`
  padding: 1px;
  margin: 0;

  table {
    width: 100%;

    tr {
      &:nth-child(even) {
        background: #f4fafe;
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

const StyledInput = styled.input`
  border: 1px solid #0f4b8f;
  width: 271px;
`;

export default UserAuthorizationStatusTable;
