import React, { useState, useEffect } from "react";
import Pagination from "../GlobalComponents/Pagination";
import config from "../config/env-urls";
import { Link } from "react-router-dom";
import styled from "styled-components";

import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
} from "@fortawesome/fontawesome-free-solid";

const UserAuthorizationStatusTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [message, setMessage] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [blank, setBlank] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("");

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
      console.log("tst", data);
      setUsers(data.data);
      setBlank(!blank);
      setMessage(!message);
      setTotalPages(data.data.length / data.pagination.perPage);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filterAndSort = () => {
    let currentUsers = [...users];

    if (name === "" && email === "") {
      setFilteredUsers(currentUsers);
    }

    if (email.length > 0) {
      currentUsers = currentUsers.filter((user) =>
        user.email.toUpperCase().includes(email.toUpperCase())
      );
    }

    if (name.length > 0) {
      currentUsers = currentUsers.filter((user) =>
        user.name.toUpperCase().includes(name.toUpperCase())
      );
    }

    if (sortBy === "name") {
      sortType === "asc"
        ? (currentUsers = currentUsers.sort((a, b) => {
            return a.name.localeCompare(b.name);
          }))
        : (currentUsers = currentUsers.sort((a, b) => {
            return b.name.localeCompare(a.name);
          }));
    }

    if (sortBy === "email") {
      sortType === "asc"
        ? (currentUsers = currentUsers.sort((a, b) => {
            return a.email.localeCompare(b.email);
          }))
        : (currentUsers = currentUsers.sort((a, b) => {
            return b.email.localeCompare(a.email);
          }));
    }

    if (sortBy === "lastAccessed") {
      sortType === "asc"
        ? (currentUsers = currentUsers.sort((a, b) => {
            return a.lastLoginDate.localeCompare(b.lastLoginDate);
          }))
        : (currentUsers = currentUsers.sort((a, b) => {
            return b.lastLoginDate.localeCompare(a.lastLoginDate);
          }));
    }

    setFilteredUsers(currentUsers);
  };

  useEffect(() => {
    filterAndSort();
  }, [name, email, sortBy, sortType]);

  const currentUsers =
    sortedUsers.length > 0 || filteredUsers.length > 0 ? filteredUsers : users;

  return (
    <Wrapper>
      <div>
        <UserTitleContainer>
          <Title>User Accounts</Title>
          <Link
            to={{
              pathname: `/Settings/users/add`,
            }}
          >
            <StyledButton>Add User</StyledButton>
          </Link>
        </UserTitleContainer>
      </div>
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
                  }}
                  onChange={(e) => setName(e.target.value)}
                />
              </th>
              <th>
                <StyledInput
                  placeholder="Email"
                  style={{
                    width: "271px",
                    marginBottom: "15px",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </th>
            </tr>
            <tr>
              <th className="head">
                First - Last Name
                <span style={{ verticalAlign: "middle" }}>
                  <FontAwesomeIcon
                    style={{
                      marginLeft: "25px",
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    onClick={() => {
                      setSortBy("name");
                      if (sortType === "" || sortType === "des") {
                        setSortType("asc");
                      }
                      if (sortType === "asc") {
                        setSortType("des");
                      }
                    }}
                    icon={
                      sortBy === "name" && sortType === "asc"
                        ? faChevronUp
                        : faChevronDown
                    }
                  />
                  <FontAwesomeIcon
                    style={{
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    onClick={() => {
                      setSortBy("name");
                      if (sortType === "" || sortType === "des") {
                        setSortType("asc");
                      }
                      if (sortType === "asc") {
                        setSortType("des");
                      }
                    }}
                    icon={
                      sortBy === "name" && sortType === "asc"
                        ? faChevronDown
                        : faChevronUp
                    }
                  />
                </span>
                <span
                  style={{
                    verticalAlign: "middle",
                  }}
                ></span>
              </th>
              <th className="head">
                Email
                <span style={{ verticalAlign: "middle" }}>
                  <FontAwesomeIcon
                    style={{
                      marginLeft: "25px",
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    onClick={() => {
                      setSortBy("email");
                      if (sortType === "" || sortType === "des") {
                        setSortType("asc");
                      }
                      if (sortType === "asc") {
                        setSortType("des");
                      }
                    }}
                    icon={
                      sortBy === "email" && sortType === "asc"
                        ? faChevronDown
                        : faChevronUp
                    }
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
                    onClick={() => {
                      setSortBy("email");
                      if (sortType === "" || sortType === "des") {
                        setSortType("asc");
                      }
                      if (sortType === "asc") {
                        setSortType("des");
                      }
                    }}
                    icon={
                      sortBy === "email" && sortType === "asc"
                        ? faChevronUp
                        : faChevronDown
                    }
                  />
                </span>
              </th>
              <th className="head">
                Last Accessed
                <span style={{ verticalAlign: "middle" }}>
                  <FontAwesomeIcon
                    style={{
                      marginLeft: "25px",
                      cursor: "pointer",
                      color: "#0F4B8F",
                    }}
                    onClick={() => {
                      setSortBy("lastAccessed");
                      if (sortType === "" || sortType === "des") {
                        setSortType("asc");
                      }
                      if (sortType === "asc") {
                        setSortType("des");
                      }
                    }}
                    icon={
                      sortBy === "lastAccessed" && sortType === "asc"
                        ? faChevronUp
                        : faChevronDown
                    }
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
                    onClick={() => {
                      setSortBy("lastAccessed");
                      if (sortType === "" || sortType === "des") {
                        setSortType("asc");
                      }
                      if (sortType === "asc") {
                        setSortType("des");
                      }
                    }}
                    icon={
                      sortBy === "lastAccessed" && sortType === "asc"
                        ? faChevronDown
                        : faChevronUp
                    }
                  />
                </span>
              </th>
              <th className="head">Actions</th>
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
                          pathname: `/Settings/users/edit/${user.id}`,
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
        totalPages={totalPages}
        pageOptions={pageOptions}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: 9%;
  margin-right: 9%;
`;

const PermissionTable = styled.div`
  padding: 1px;
  margin: 0;

  table {
    width: 100%;
    text-align: left;
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

    border-bottom: 1px solid #094a8a;
    background-color: #ffffff;
    margin-right: 50px;
    width: 100px;
  }
`;

const StyledInput = styled.input`
  border: 1px solid #0f4b8f;
  width: 271px;
`;

const UserTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.p`
  color: #707070;
  font-size: 36px;
  text-align: left;
`;

const StyledButton = styled.button`
  background-color: #0f4b8f;
  color: white;
  font-weight: bold;
  border: none;
  height: 36px;
  padding-left: 14px;
  padding-right: 14px;
`;

export default UserAuthorizationStatusTable;
