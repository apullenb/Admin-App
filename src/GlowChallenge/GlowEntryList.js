import { React } from 'react';
import { connect } from 'react-redux';
import getComponentData from './selector';
/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Pagination from '../SkincareChallenge/SCAccountList/Pagination';
import '../SkincareChallenge/SCEntryList/EntryList.scss';
import { CaretUp, CaretDown } from 'react-bootstrap-icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getGlowEntries } from './../redux/actions/Skincare/skincareActions';
import SpinnerLoader from '../GlobalComponents/ZilisSpinnerLoader';
import { useToasts } from 'react-toast-notifications';

function GlowEntryList(props) {
  const { view, edit, entries, permissionFeched, PermissionsError,error} = props;
  const [message, setMessage] = useState(true);

  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [colSort, setColSort] = useState('glowEntryId');
  const [sortDirection, setSortDirection] = useState('asc');
  const [localAccounts, setLocalAccounts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [contests, setContests] = useState([]);
  const [products, setProducts] = useState([]);
  const [imgFilter, setImgFilter] = useState([]);
 
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    if(error)
    {addToast('The information failed to load. Please refresh the page. Contact IT if the problem continues.', {
      appearance: 'error',
    })}
    else
   { dispatch(getGlowEntries(perPage, pageNo, colSort, sortDirection, filter));}
  }, [error]);

  useEffect(() => {
    setLocalAccounts(entries.entries);
    setContests(entries.contests);
    setProducts(entries.products);
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
    var currentFilter = filter;
    var existingImgFilter = imgFilter
    if (e.target.type === "checkbox") {
      var existingImgIndex = existingImgFilter.findIndex(f => f.column === e.target.id);
      if (existingImgIndex >= 0 ) {
        if (!e.target.checked) {
           existingImgFilter.splice(existingImgIndex, 1);
        } else {
          existingImgFilter[existingImgIndex].value = e.target.checked;
        } 
      } else {
        existingImgFilter.push( {column: e.target.id, value: e.target.checked})
      }
      setImgFilter(existingImgFilter);
    } else {
      var existingIndex = currentFilter.findIndex(f => f.column === e.target.id);
     
      if (existingIndex >= 0 ) {
        if (e.target.value === '') {
          currentFilter.splice(existingIndex, 1);
        } else {
          currentFilter[existingIndex].value = e.target.value;
        } 
      } else {
        currentFilter.push( {column: e.target.id, value: e.target.value})
      }
      setFilter(currentFilter);
    }
    dispatch(
      getGlowEntries(perPage, pageNo, colSort, sortDirection, currentFilter, existingImgFilter)
    );
  };

 
  return (
    <div style={{ margin: "0 1%" }}>
      <h1 style={{textAlign:'left'}}>Glow Challenge Entries</h1>
    
      {permissionFeched ? (
       !error && (view?
        <>
      <AccountTable>
        <table>
          <thead>
            <tr>
              <th id="filter">
                <input
                
                  id="glowEntryId"
                  type="text"
                  onBlur={(e) => {
                    handleChange(e);
                  }}
                  onKeyPress={(e)=> {if (e.key === 'Enter') handleChange(e)}}
                />
              </th>
              <th id="filter">
                <input
                
                  id="email"
                  type="text"
                  onBlur={(e) => {
                   
                    handleChange(e);
                  }}
                  onKeyPress={(e)=> {if (e.key === 'Enter') handleChange(e)}}
                />
              </th>
              <th id="filter">
                <input
                
                  id="ambassador_id"
                  type="text"
                  onBlur={(e) => {
                    handleChange(e);
                  }}
                  onKeyPress={(e)=> {if (e.key === 'Enter') handleChange(e)}}
                />
              </th>
              <th id="filter">
                <input
            
                  id="name"
                  type="text"
                  onBlur={(e) => {
                   
                    handleChange(e);
                  }}
                  onKeyPress={(e)=> {if (e.key === 'Enter') handleChange(e)}}
                />
              </th>
              <th id="filter">
                <select
                  id="title"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                 
                >
                  <option value=""> </option>
                  {contests &&
                    contests.map((c, k) => (
                      <option id="title" value={c.title} key={k}>
                        {c.title}
                      </option>
                    ))}
                </select>
              </th>
              <th id="filter" className="check">
                <input
                  type="checkbox"
                  id="day1Photo"
                  value="1"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter" className="check">
                <input
                  type="checkbox"
                  id="day30Photo"
                  value="30"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter" className="check">
                <input
                  type="checkbox"
                  id="day60Photo"
                  value="60"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </th>
              <th id="filter" className="check">
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
              {edit && <th className="head">Actions </th>}
            </tr>
          </thead>
          <tbody>
            {
              localAccounts?.length > 0 && localAccounts.map((user, i) => {
                user.products = products;
                return (
                  <tr key={i} user={user} id="row">
                    <td>
                      <Link
                        style={{ color: "#212529" }}
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        {user.glowEntryId}
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ color: "#212529" }}
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        {user.email.slice(0, 21)}
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ color: "#212529" }}
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        {user.ambassadorId}
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ color: "#212529" }}
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        {user.name}
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ color: "#212529" }}
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        {user.title}
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ color: "#212529" }}
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        {user.day1Photo ? (
                          <img src={user.day1Photo} style={{ width: "30px" }} />
                        ) : (
                          <div
                            style={{
                              width: "30px",
                              height: "34px",
                              border: "1px solid grey",
                            }}
                          ></div>
                        )}{" "}
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ color: "#212529" }}
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        {" "}
                        {user.day30Photo ? (
                          <img
                            src={user.day30Photo}
                            style={{ width: "30px" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "30px",
                              height: "34px",
                              border: "1px solid grey",
                            }}
                          ></div>
                        )}
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ color: "#212529" }}
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        {" "}
                        {user.day60Photo ? (
                          <img
                            src={user.day60Photo}
                            style={{ width: "30px" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "30px",
                              height: "34px",
                              border: "1px solid grey",
                            }}
                          ></div>
                        )}
                      </Link>
                    </td>
                    <td>
                      <Link
                        style={{ color: "#212529" }}
                        to={{
                          pathname: `/Challenge/Glow-Entry/${user.glowEntryId}`,
                          state: user,
                        }}
                      >
                        {" "}
                        {user.day90Photo ? (
                          <img
                            src={user.day90Photo}
                            style={{ width: "30px" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "30px",
                              height: "34px",
                              border: "1px solid grey",
                            }}
                          ></div>
                        )}
                      </Link>
                    </td>
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
            })
             }
          </tbody>
        </table>
        <h3>{message}</h3>
      </AccountTable>

      <Pagination
        getEntries={getGlowEntries()}
        updatePerPage={updatePerPage}
        updatePageNo={updatePageNo}
        
      />
     </>:
     <Redirect to='/NoPermission'/>)
    ):
     <SpinnerLoader/>
      }
    </div>
  );
}

export default connect(getComponentData)(GlowEntryList);

const AccountTable = styled.div`
  padding: 1px ;
  margin: 3% 0;

  .check {
    gap: 0.9em;
    line-height: 1.1;
    margin: 10px 5px;
  }
  input[type="checkbox"] {
    appearance: none;
    margin: 0 5px;
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
    height: 0em;
  }

  input:checked {
    &:after {
      content: "✔";
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
        padding: 5px 10px;
      }
    }
  }

  .head {
    font-size: 18px;
    font-weight: 400;
    color: rgb(94, 93, 93);
    margin: 3px;
    padding: 5px 10px;
    border-bottom: 1px solid #094a8a;
    text-align: left;
  }

  #filter {
    text-align: left;
    padding: 0 3% 0 0;
  }
  #glowEntryId {
    width: 100px;
    margin: 0 5px;
  }
  #email {
    width: 160px;
    margin: 0 5px;
  }
  #name {
    width: 130px;
    margin: 0 5px;
  }
  #ambassador_id {
    width: 150px;
    margin: 0 5px;
  }
  #title {
    width: 110px;
    margin: 0 5px;
  }
`;
