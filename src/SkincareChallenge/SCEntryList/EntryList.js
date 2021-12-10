/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import "./EntryList.scss";
import Entries from "./Entries";
import Pagination from "./Pagination";
import { CaretUp, CaretDown } from "react-bootstrap-icons";
import styled from "styled-components";
import { connect, useDispatch} from "react-redux";
import { getEntries } from "../../redux/actions/Skincare/skincareActions";
import getComponentData from "./selector";
import ZilisLoader from "../../GlobalComponents/ZilisLoader";

const EntryList = (props) => {
  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [colSort, setColSort] = useState("entries.id");
  const [sortDirection, setSortDirection] = useState("asc");

  const dispatch = useDispatch();

  const { view, edit ,entries ,permissionFeched ,} = props;

  useEffect(() => {
    dispatch(getEntries());
  }, []);

  const entriesSort = (numPerPage, pageNoVal, sortInfo, sortBy) => {
    setColSort(sortInfo);
    setSortDirection(sortBy);
    dispatch(getEntries(numPerPage, pageNoVal, sortInfo, sortBy));
  };

  const updatePerPage = (val) => {
    setPerPage(val);
    dispatch(getEntries(val, pageNo, colSort, sortDirection));
  };

  const updatePageNo = (val) => {
    setPageNo(val);
    dispatch(getEntries(perPage, val, colSort, sortDirection));
  };

  return (
    <div>
      <h1>Skincare Challenge Entries</h1>
      {permissionFeched ? ( 
        !view ? <Redirect to='/NoPermission'/>:
        <>
          <EntryTable>
            <section className="button-row">
              <button className="add-entry-btn">New Entry</button>
            </section>

            <table>
              <thead>
                <tr>
                  <th className="head">
                    Entry ID <br />
                    <CaretUp
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(perPage, pageNo, "entries.id", "asc");
                      }}
                    />
                    <CaretDown
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(perPage, pageNo, "entries.id", "desc");
                      }}
                    />
                  </th>
                  <th className="head">
                    Entry Date
                    <br />
                    <CaretUp
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(
                          perPage,
                          pageNo,
                          "entries.createdDate",
                          "asc"
                        );
                      }}
                    />
                    <CaretDown
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(
                          perPage,
                          pageNo,
                          "entries.createdDate",
                          "desc"
                        );
                      }}
                    />
                  </th>
                  <th className="head">
                    Ambassador ID <br />
                    <CaretUp
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(
                          perPage,
                          pageNo,
                          "owner.ambassador_id",
                          "asc"
                        );
                      }}
                    />
                    <CaretDown
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(
                          perPage,
                          pageNo,
                          "owner.ambassador_id",
                          "desc"
                        );
                      }}
                    />
                  </th>
                  <th className="head">
                    Name <br />
                    <CaretUp
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(perPage, pageNo, "owner.name", "asc");
                      }}
                    />
                    <CaretDown
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(perPage, pageNo, "owner.name", "desc");
                      }}
                    />
                  </th>
                  <th className="head">
                    Challenge <br />
                    <CaretUp
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(perPage, pageNo, "contests.title", "asc");
                      }}
                    />
                    <CaretDown
                      className="caretIcons"
                      onClick={() => {
                        entriesSort(perPage, pageNo, "contests.title", "desc");
                      }}
                    />
                  </th>
                  <th className="head">Day 1 Photo</th>
                  <th className="head">Day 30 Photo</th>
                  {/* <th className="head">Featured <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.isFeatured","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.isFeatured","desc")}}/> 
                           </th> */}
                  {/* <th className="head">Approved <br/>
                                <CaretUp className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.isApproved","asc")}}/>
                                <CaretDown className="caretIcons" onClick={() => {entriesSort(perPage,pageNo,"entries.isApproved","desc")}}/> 
                           </th> */}
                  {edit && <th className="head">Actions</th>}
                </tr>
              </thead>
              <tbody>
              {entries?.data?.length > 1 &&
                entries.data.map((entry, i) => {
                  return (
                    <Entries key={i} entry={entry} editPermission={edit} />
                  );
                })}
                </tbody>
            </table>
          </EntryTable>

          <Pagination
            getEntries={getEntries()}
            updatePerPage={updatePerPage}
            updatePageNo={updatePageNo}
          />
        </>
      ):<ZilisLoader/>
      }
    </div>
  );
};

export default connect(getComponentData)(EntryList);

const EntryTable = styled.div`
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
        text-align: center;
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
