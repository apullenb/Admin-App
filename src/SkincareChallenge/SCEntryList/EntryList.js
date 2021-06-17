import React, {useEffect} from 'react';
import "./EntryList.scss";
import Entries from './Entries';
import Pagination from "./Pagination";
import { CaretUp, CaretDown } from "react-bootstrap-icons";
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getEntries } from '../../redux/actions/Skincare/skincareActions';

const EntryList = () => {
    const dispatch = useDispatch();
    const { entries } = useSelector(state => state.entries);

    useEffect(() => {
        dispatch(getEntries());
    }, []);

  const entriesSortAsc = () => {
    dispatch(getEntries(10,1,"entries.id","asc"));
  }

  const entriesSortDesc = () => {
    dispatch(getEntries(10,1,"entries.id","desc"));
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
                                <CaretUp className="caretIcons" onClick={() => {entriesSortAsc(10,1,"entries.id","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSortDesc(10,1,"entries.id","desc")}}/> 
                           </th>
                           <th className="head">Entry Date<br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSortAsc(10,1,"entries.createdDate","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSortDesc(10,1,"entries.createdDate","desc")}}/> 
                            </th>
                           <th className="head">Ambassador ID <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSortAsc(10,1,"owner.ambassador_id","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSortDesc(10,1,"owner.ambassador_id","desc")}}/> 
                           </th>
                           <th className="head">Name <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSortAsc(10,1,"owner.name","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSortDesc(10,1,"owner.name","desc")}}/> 
                           </th>
                           <th className="head">Challenge <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSortAsc(10,1,"contests.title","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSortDesc(10,1,"contests.title","desc")}}/> 
                           </th>
                           <th className="head">Day 1 Photo</th>
                           <th className="head">Day 30 Photo</th>
                           <th className="head">Featured <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSortAsc(10,1,"entries.isFeatured","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSortDesc(10,1,"entries.isFeatured","desc")}}/> 
                           </th>
                           <th className="head">Approved <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSortAsc(10,1,"entries.isApproved","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSortDesc(10,1,"entries.isApproved","desc")}}/> 
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
               <Pagination getEntries={getEntries()}/>

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