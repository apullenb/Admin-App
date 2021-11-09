/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../SkincareChallenge/SCAccountList/Pagination";
import '../SkincareChallenge/SCEntryList/EntryList.scss'
import { CaretUp, CaretDown} from "react-bootstrap-icons";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, filterAccounts} from './../redux/actions/Skincare/skincareActions';
import { getEntries } from './../redux/actions/Skincare/skincareActions';
import GlowEntries from "./GlowEntries";

function GlowEntryList() {
    const [message, setMessage] = useState(true);
    const [blank, setBlank] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [colSort, setColSort] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const [localAccounts, setLocalAccounts ] = useState([]);
    const [idInput, setIdInput] = useState(false);
    const [nameInput, setNameInput] = useState(false);
    const [emailInput, setEmailInput] = useState(false);
    const [ambassadorIdInput, setAmbassadorIdInput] = useState(false);
    const [challengeInput, setChallengeInput] = useState(false);
    const [col, setCol] = useState("id");
    const [filter, setFilter] = useState("");
  
    const dispatch = useDispatch();
    const { accounts } = useSelector(state => state.entries);
  
    useEffect(() => {
      dispatch(filterAccounts(col, filter, perPage, pageNo, colSort, sortDirection));
    }, []);
  
  
    useEffect(() => {
  setLocalAccounts(accounts);
    }, [accounts]);
  
    
    const accountsSort = (numPerPage, pageNoVal, sortInfo, sortBy) => {
      setColSort(sortInfo);
      setSortDirection(sortBy);
      dispatch(filterAccounts(col, filter, numPerPage, pageNoVal, sortInfo, sortBy));
    }
  
    const updatePerPage = (val) =>{
      setPerPage(val);
      dispatch(filterAccounts(col, filter, val, pageNo, colSort, sortDirection));
    }
  
    const updatePageNo = (val) => {
      setPageNo(val);
      dispatch(filterAccounts(col, filter, perPage, val, colSort, sortDirection));
    }
  
  
  const handleChange = (e) => {
  const filter = e.target.value;
  const col = e.target.id;
  setCol(e.target.id);
  setFilter(e.target.value);
  if (e.target.value === "") {
    dispatch(getAccounts());
  } else {
    dispatch(filterAccounts(col, filter, perPage, pageNo, colSort, sortDirection));
  }
  };
  
  const disableInput = (e) => {
   if (e.target.value === ""){
    setNameInput(false);
    setEmailInput(false);
    setIdInput(false);
    setAmbassadorIdInput(false);
    }
  else if (e.target.id === "id") {
    setNameInput(true);
    setEmailInput(true);
    setAmbassadorIdInput(true);
  }
  else if (e.target.id === "name") {
    setIdInput(true);
    setEmailInput(true);
    setAmbassadorIdInput(true);
  }
  else if (e.target.id === "email") {
    setNameInput(true);
    setIdInput(true);
    setAmbassadorIdInput(true);
  }
  else if (e.target.id === "ambassadorID") {
    setNameInput(true);
    setEmailInput(true);
    setIdInput(true);
  } 
  
  }
  
    return (
        <div>
            <h1>Glow Challenge Entries</h1>
            <AccountTable>
          <table>
            <thead>
            <tr>
              <th id="filter">
                <input
                disabled={idInput}
                id="id"
                  type="text"
                  onChange={(e) => {disableInput(e) ; handleChange(e)}}
                />
              </th>
              <th id="filter">
                <input 
                disabled={nameInput}
                id="name"
                 type="text"
                 onChange={(e) => {disableInput(e) ; handleChange(e)}}
                  />
              </th>
              <th id="filter">
                <input 
                disabled={emailInput}
                id="email"
                type="text" 
                onChange={(e) => {disableInput(e) ; handleChange(e)}}
                />
              </th>
              <th id="filter">
                <input
                disabled={ambassadorIdInput} 
                id="ambassadorId"
                type="text" 
                onChange={(e) => {disableInput(e) ; handleChange(e)}}
                 />
              </th>
              <th id="filter">
              <select id="challenge" onChange={(e) => {disableInput(e) ; handleChange(e)}}>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </select>
              </th>
            </tr><tr></tr>
              <tr>
                <th className="head">Entry ID
                <CaretUp className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"id","asc")}}/>
                <CaretDown className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"id","desc")}}/> 
                </th>
                <th className="head">Name
                <CaretUp className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"name","asc")}}/>
                <CaretDown className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"name","desc")}}/> 
                </th>
                <th className="head">Email
                <CaretUp className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"email","asc")}}/>
                <CaretDown className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"email","desc")}}/> 
                </th>
                <th className="head">Ambassador ID
                <CaretUp className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"ambassadorId","asc")}}/>
                <CaretDown className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"ambassadorId","desc")}}/> 
                </th>
                <th className="head">Challenge
                </th>
                <th className="head">Actions </th>
              </tr>
            </thead>
            {localAccounts && localAccounts.data && localAccounts.data.length >= 1 && <tbody>
              {localAccounts.data.map((user, i) => {
                return (
                  <tr key={i} user = {user} id="row">
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}{blank}</td>
                    <td>{user.ambassadorId}</td>
                    <td>{user.lastLoginDate}</td>
                    <td>{user.lastChallenge}{message}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/Challenge/Accounts/${user.id}`,
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
        </AccountTable>

        <Pagination getEntries={getAccounts()} updatePerPage={updatePerPage} updatePageNo={updatePageNo} />
        </div>
    )
}

export default GlowEntryList;

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