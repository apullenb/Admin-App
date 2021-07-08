/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./AccountList.scss";
//import Pagination from "../../GlobalComponents/Pagination";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, filterAccounts } from '../../redux/actions/Skincare/skincareActions';
import { CaretUp, CaretDown} from "react-bootstrap-icons";
import Pagination from "./Pagination";

function AccountList() {
  const [message, setMessage] = useState(true);
  const [blank, setBlank] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [colSort, setColSort] = useState("users.id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [localAccounts, setLocalAccounts ] = useState([]);

  const dispatch = useDispatch();
  const { accounts } = useSelector(state => state.entries);

  useEffect(() => {
    dispatch(getAccounts());
  }, []);


  useEffect(() => {
setLocalAccounts(accounts);
console.log(localAccounts);
  }, [accounts]);

  
  const accountsSort = (numPerPage, pageNoVal, sortInfo, sortBy) => {
    setColSort(sortInfo);
    setSortDirection(sortBy);
    dispatch(getAccounts(numPerPage, pageNoVal, sortInfo, sortBy));
  }

  const updatePerPage = (val) =>{
    setPerPage(val);
    dispatch(getAccounts(val, pageNo, colSort, sortDirection));
  }

  const updatePageNo = (val) => {
    setPageNo(val);
    dispatch(getAccounts(perPage, val, colSort, sortDirection));
  }


const handleChange = (e) => {
console.log(e.target.value);
const filter = e.target.value;
const col = e.target.id;
dispatch(filterAccounts(col, filter));
};

  return (
    <PageWrapper>
        <h1>Skincare Challenge Accounts</h1>
        <AccountTable>
          <table>
            <thead>
            <tr>
              <th id="filter">
                <input
                id="users.id"
                  type="text"
                  onBlur={(e) => handleChange(e)} 
                />
              </th>
              <th id="filter">
                <input 
                id="users.name"
                 type="text"
                 onBlur={(e) => handleChange(e)} 
                  />
              </th>
              <th id="filter">
                <input 
                id="users.email"
                type="text" 
                onBlur={(e) => handleChange(e)} />
              </th>
              <th id="filter">
                <input 
                id="users.ambassadorID"
                type="text" 
                onBlur={(e) => handleChange(e)} />
              </th>
            </tr><tr></tr>
              <tr>
                <th className="head">Account ID<br/>
                <CaretUp className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"users.id","asc")}}/>
                <CaretDown className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"users.id","desc")}}/> 
                </th>
                <th className="head">Name<br/>
                <CaretUp className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"users.name","asc")}}/>
                <CaretDown className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"users.name","desc")}}/> 
                </th>
                <th className="head">Email<br/>
                <CaretUp className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"users.email","asc")}}/>
                <CaretDown className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"users.email","desc")}}/> 
                </th>
                <th className="head">Ambassador ID<br/>
                <CaretUp className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"users.ambassadorId","asc")}}/>
                <CaretDown className="caretIcons" onClick={() => {accountsSort(perPage,pageNo,"users.ambassadorId","desc")}}/> 
                </th>
                <th className="head">Last Login<br/> 
                </th>
                <th className="head">Last Challenge<br/>
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
    </PageWrapper>
  );
}

export default AccountList;

const PageWrapper = styled.div`
  width: 1400px;
`;

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
`;
