import React, {useEffect, useState} from 'react';
import "./EntryList.scss";
import Entries from './Entries';
import Pagination from "./Pagination";
import { CaretUp, CaretDown } from "react-bootstrap-icons";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getEntries } from '../../redux/actions/Skincare/skincareActions';

const EntryList = () => {
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);

    const dispatch = useDispatch();
    const { entries } = useSelector(state => state.entries);

    useEffect(() => {
        dispatch(getEntries());
    }, []);

  const entriesSort = (numPerPage, pageNoVal, sortInfo, sortBy) => {
    dispatch(getEntries(numPerPage, pageNoVal, sortInfo, sortBy));
  }

  const updatePerPage = (val) =>{
    setPerPage(val);
  }

  const updatePageNo = (val) => {
    setPageNo(val);
  }

    return (
        <div>
               <h1>Skincare Challenge Entries</h1>
               <section className="entry-table">
               <EntryTable>
                   <table>
                        <button className="add-entry-btn">New Entry</button>
                       <tr>
                       <th className="head"> Entry ID <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.id","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.id","desc")}}/> 
                           </th>
                           <th className="head">Entry Date<br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.createdDate","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.createdDate","desc")}}/> 
                            </th>
                           <th className="head">Ambassador ID <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"owner.ambassador_id","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"owner.ambassador_id","desc")}}/> 
                           </th>
                           <th className="head">Name <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"owner.name","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"owner.name","desc")}}/> 
                           </th>
                           <th className="head">Challenge <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"contests.title","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"contests.title","desc")}}/> 
                           </th>
                           <th className="head">Day 1 Photo</th>
                           <th className="head">Day 30 Photo</th>
                           <th className="head">Featured <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.isFeatured","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.isFeatured","desc")}}/> 
                           </th>
                           <th className="head">Approved <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.isApproved","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.isApproved","desc")}}/> 
                           </th>
                           <th className="head">Actions</th>
                       </tr>
                        {entries && entries.data &&
                        entries.data.length > 1 &&
                        entries.data.map((entry, i) => {
                            return <Entries key= {i} entry = {entry}/>;
                        })}
                   </table>
                   </EntryTable>
               </section>
               <Pagination getEntries={getEntries()} updatePerPage={updatePerPage} updatePageNo={updatePageNo} />

          </div>
    )
}

export default EntryList;

const EntryTable = styled.div`
  padding: 1px;
  margin: 0;

  table {
    width: 100%;
    
     tr {
      &:nth-child(odd) {
        background: #F4FAFE;
      }
      
      td {
        padding: 5px 0;
        text-align: center 
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