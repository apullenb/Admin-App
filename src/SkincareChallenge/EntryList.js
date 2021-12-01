/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import config from '../config/env-urls';
import Pagination from '../GlobalComponents/Pagination';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Moment from 'react-moment';

function EntryList() {
  const [entries, setEntries] = useState('');
  // const [filter, setFilter] = useState("");
  // const [category, setCategory] = useState("");
  const [message, setMessage] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [blank, setBlank] = useState(false);

  const pageOptions = [10, 15, 20];

  const getUsers = async (perPage = 10, pageNo = 1) => {
    try {
      const requestOptions = {
        method: 'GET',
      };
      const response = await fetch(
        `${config.SKINCAREBASEURL}/api/challenge/all-entries?perPage=${perPage}&pageNo=${pageNo}&orderBy=entries.id`,
        requestOptions
      );
      const data = await response.json();
      setEntries(data.data);
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
      <h1>Skincare Challenge Entries</h1>
      <EntryTable>
        <table>
          <thead>
            <tr>
              <th>Entry ID</th>
              <th>Entry Date</th>
              <th>Ambassador ID</th>
              <th>Name</th>
              <th>Contest</th>
              <th>Images</th>
              <th>Featured</th>
              <th>Approved</th>
              <th>Actions</th>
            </tr>
          </thead>
          {entries && entries.length > 1 && (
            <tbody>
              {entries.map((entry, i) => {
                return (
                  <tr key={i} id='row'>
                    <td>{entry.id}</td>
                    <td>{entry.day1UploadDate && <Moment format='MM/DD/YYYY'>{entry.day1UploadDate}</Moment>}</td>
                    <td>{entry.ambassadorId}</td>
                    <td>{entry.name}</td>
                    <td>{entry.contestTitle}</td>
                    <td>
                      {entry.day1ImageUrl && <img className='image-thumbnail' alt='Day 1 Photo' src={entry.day1ImageUrl} />}
                      {entry.day30ImageUrl && <img className='image-thumbnail' alt='Day 30 Photo' src={entry.day30ImageUrl} />}
                    </td>
                    <td>{entry.isFeatured ? 'Yes' : 'No'}</td>
                    <td>{entry.isApproved ? 'Yes' : 'No'}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/Challenge/Entry/${entry.id}`,
                          state: entry,
                        }}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        <h3>{message}</h3>
      </EntryTable>

      <Pagination getRows={getUsers} totalRows={totalUsers} pageOptions={pageOptions} />
    </PageWrapper>
  );
}

export default EntryList;

const PageWrapper = styled.div`
  width: 1400px;
`;

const EntryTable = styled.div`
  padding: 1px;
  margin: 0;

  table {
    width: 100%;

    tr {
      &:nth-child(even) {
        background: #f4fafe;
      }

      thead {
        border-bottom: 1px solid #094a8a;
      }

      th,
      td {
        font-size: 18px;
        font-weight: 400;
        color: rgb(94, 93, 93);
        padding: 5px 10px;
        text-align: left;
        height: 67px;
      }
    }
  }

  .image-thumbnail {
    width: 50px;
    display: inline-block;
  }
`;
