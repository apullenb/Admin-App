/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../SkincareChallenge/SCAccountList/Pagination";
import "../SkincareChallenge/SCEntryList/EntryList.scss";
import { CaretUp, CaretDown } from "react-bootstrap-icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {  getGlowEntries} from "./../redux/actions/Skincare/skincareActions";


function GlowEntryList() {
  const [message, setMessage] = useState(true);
  const [blank, setBlank] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [colSort, setColSort] = useState("glowEntryId");
  const [sortDirection, setSortDirection] = useState("asc");
  const [localAccounts, setLocalAccounts] = useState([]);
  const [idInput, setIdInput] = useState(false);
  const [nameInput, setNameInput] = useState(false);
  const [emailInput, setEmailInput] = useState(false);
  const [ambassadorIdInput, setAmbassadorIdInput] = useState(false);
  const [challengeInput, setChallengeInput] = useState(false);
  const [col, setCol] = useState("glowEntryId");
  const [filter, setFilter] = useState("");
  const [contests, setContests] = useState([])
  const [products, setProducts] = useState([])

  const dispatch = useDispatch();
  const { entries } = useSelector((state) => state.entries);


  useEffect(() => {
    dispatch(getGlowEntries(perPage, pageNo, colSort, sortDirection, filter));
  }, []);

  useEffect(() => {
    setLocalAccounts(entries.entries);
    setContests(entries.contests)
    setProducts(entries.products)
  }, [entries]);

  const accountsSort = (numPerPage, pageNoVal, sortInfo, sortBy) => {
    setColSort(sortInfo);
    setSortDirection(sortBy);
    dispatch(getGlowEntries(numPerPage, pageNoVal, sortInfo, sortBy));
  };

  const updatePerPage = (val) => {
    setPerPage(val);
    dispatch(getGlowEntries(val, pageNo, colSort, sortDirection, filter));
  };

  const updatePageNo = (val) => {
    setPageNo(val);
    dispatch(getGlowEntries(perPage, val, colSort, sortDirection, filter));
  };

  const handleChange = (e) => {
      const column = e.target.type === 'checkbox' && e.target.id === col ? "glowEntryId" : e.target.id
      const searchTerm = e.target.type === 'text' && localAccounts.length >= 1  || e.target.type !== 'checkbox' ? e.target.value : ''
      setFilter(searchTerm)
      setCol(column)
      setColSort(e.target.id)
    dispatch(getGlowEntries( perPage, pageNo, column, sortDirection, searchTerm));
  };

  

  const disableInput = (e) => {
    if (e.target.value === "") {
      setNameInput(false);
      setEmailInput(false);
      setIdInput(false);
      setAmbassadorIdInput(false);
    } else if (e.target.id === "glowEntryId") {
      setNameInput(true);
      setEmailInput(true);
      setAmbassadorIdInput(true);
    } else if (e.target.id === "name") {
      setIdInput(true);
      setEmailInput(true);
      setAmbassadorIdInput(true);
    } else if (e.target.id === "email") {
      setNameInput(true);
      setIdInput(true);
      setAmbassadorIdInput(true);
    } else if (e.target.id === "ambassadorId") {
      setNameInput(true);
      setEmailInput(true);
      setIdInput(true);
    }
  };


  return (
    <div style={{margin:'0 8%'}}>
      <h1>Glow Challenge Entries</h1>
      <AccountTable>
        <table>
          <thead>
            <tr>
              <th id="filter">
                <input
                  disabled={idInput}
                  id="glowEntryId"
                  type="text"
                  onChange={(e) => {
                    disableInput(e);
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter">
                <input
                  disabled={emailInput}
                  id="email"
                  type="text"
                  onChange={(e) => {
                    disableInput(e);
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter">
                <input
                  disabled={ambassadorIdInput}
                  id="ambassadorId"
                  type="text"
                  onChange={(e) => {
                    disableInput(e);
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter">
                <input
                  disabled={nameInput}
                  id="name"
                  type="text"
                  onChange={(e) => {
                    disableInput(e);
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter">
                <select
                  id="title"
                  onChange={(e) => {
                    disableInput(e);
                    handleChange(e);
                  }}
                >
                  <option value=""> </option>
                  {contests && contests.map(c => <option id='title' value={c.title}>{c.title} </option>)
                  }
                </select>
              </th>
              <th id="filter" className='check'>
                <input
                  type="checkbox"
                  id="day1Photo"
                  value="1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter" className='check'>
                <input
                  type="checkbox"
                  id="day30Photo"
                  value="30"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter" className='check'>
                <input
                  type="checkbox"
                  id="day60Photo"
                  value="60"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter" className='check'>
                <input
                  type="checkbox"
                  id="day90Photo"
                  value="90"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </th>
            </tr>
            <tr></tr>
            <tr>
              <th className="head">
                Entry ID
                <CaretUp
                  className="caretIcons"
                  onClick={() => {
                    accountsSort(perPage, pageNo, "glowEntryId", "asc");
                  }}
                />
                <CaretDown
                  className="caretIcons"
                  onClick={() => {
                    accountsSort(perPage, pageNo, "glowEntryId", "desc");
                  }}
                />
              </th>
              <th className="head">
                Email
                <CaretUp
                  className="caretIcons"
                  onClick={() => {
                    accountsSort(perPage, pageNo, "email", "asc");
                  }}
                />
                <CaretDown
                  className="caretIcons"
                  onClick={() => {
                    accountsSort(perPage, pageNo, "email", "desc");
                  }}
                />
              </th>
              <th className="head">
                Ambassador ID
                <CaretUp
                  className="caretIcons"
                  onClick={() => {
                    accountsSort(perPage, pageNo, "ambassadorId", "asc");
                  }}
                />
                <CaretDown
                  className="caretIcons"
                  onClick={() => {
                    accountsSort(perPage, pageNo, "ambassadorId", "desc");
                  }}
                />
              </th>
              <th className="head">
                Name
                <CaretUp
                  className="caretIcons"
                  onClick={() => {
                    accountsSort(perPage, pageNo, "name", "asc");
                  }}
                />
                <CaretDown
                  className="caretIcons"
                  onClick={() => {
                    accountsSort(perPage, pageNo, "name", "desc");
                  }}
                />
              </th>
              <th className="head">Challenge</th>
              <th className="head">1</th>
              <th className="head">30</th>
              <th className="head">60</th>
              <th className="head">90</th>
              <th className="head">Actions </th>
            </tr>
          </thead>
          <tbody>
            {localAccounts && localAccounts.length > 0 &&
              localAccounts.map((user, i) => {
                  user.products = products
                return (
                  <tr key={i} user={user} id="row">
                    <td>{user.glowEntryId}</td>
                    <td>{user.email}</td>
                    <td>{user.ambassadorId}</td>
                    <td>{user.name}</td>
                    <td>{user.title}</td>
                    <td>
                      {user.day1Photo ? (
                        <img src={user.day1Photo} style={{ width: "30px" }} />
                      ) : (<div style={{ width: "30px" }}></div>)}
                    </td>
                    <td> {user.day30Photo ? (
                        <img src={user.day30Photo} style={{ width: "30px" }} />
                      ) : (<div style={{ width: "30px" }}></div>)}</td>
                    <td> {user.day60Photo ? (
                        <img src={user.day60Photo} style={{ width: "30px" }} />
                      ) : (<div style={{ width: "30px" }}></div>)}</td>
                    <td> {user.day90Photo ? (
                        <img src={user.day90Photo} style={{ width: "30px" }} />
                      ) : (<div style={{ width: "30px" }}></div>)}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        <button id="edit">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <h3>{message}</h3>
      </AccountTable>

      <Pagination
        getEntries={getGlowEntries()}
        updatePerPage={updatePerPage}
        updatePageNo={updatePageNo}
      />
    </div>
  );
}

export default GlowEntryList;



const AccountTable = styled.div`
  padding: 1px;
  margin: 0;
  
  .check {
    gap: 0.9em;
    line-height: 1.1;
    margin: 10px 5px;
}
input[type="checkbox"] {
    appearance: none;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 0.05em solid #707070;
    display: grid;
    place-content: center;
    opacity: 0.8;
}
input[type="checkbox"]::before {
    content: "";
    width: 0.85em;
    height: 0.0em;
   
  }

input:checked {
    &:after {
      content: '✔';
      font-size: 16px;
      color: #707070;
      opacity: 0.8;
      width: 0em;
      height: 1.2em;
      opacity: 0.9;
      }
  }

  table {
    width: 100%;

    tr {
      &:nth-child(even) {
        background: #f4fafe;
      }

      td {
        text-align: left;
        padding: 5px 3px;
      }
    }
  }

  .head {
    font-size: 18px;
    font-weight: 400;
    color: rgb(94, 93, 93);
    margin: 3px;
    padding: 5px;
    border-bottom: 1px solid #094a8a;
    text-align: left;
  }

  #filter {
    text-align: left;
  }
`;
