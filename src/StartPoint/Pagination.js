/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Pagination(props) {
  const [pageNo, setPageNo] = useState(1);
  const [skip, setSkip] = useState(0);
  const [perPage, setPerpage] = useState(10);
  const [blank, setBlank] = useState(true);
  const pageOptions = [10, 15, 20];

  useEffect(() => {}, []);

  const changePerPage = (e) => {
    const num = parseInt(e.target.value);
    setPerpage(num);
    props.updatePerPage(num);
  };

  const handlePrevPage = () => {
    const perPageVal = pageNo - 1;
    setPageNo(perPageVal);
    const calcSkip = skip - perPage;
    setSkip(calcSkip);
    props.handleUpdateSkip(calcSkip);
    setBlank(!blank);
  };

  const handleNextPage = () => {
    const perPageVal = pageNo + 1;
    setPageNo(perPageVal);
    const calcSkip = skip + perPage;
    setSkip(calcSkip);
    props.handleUpdateSkip(calcSkip);
    setBlank(!blank);
  };

  return (
    <PaginationWrapper>
      <PaginationControls>
        <button className="btn" onClick={handlePrevPage} disabled={pageNo === 1}>
          {'< Prev'}
        </button>{' '}
        Current Page: <div className="current"> {pageNo}</div>
        Per Page:{' '}
        <select
          value={perPage}
          onChange={(e) => {
            changePerPage(e);
          }}
        >
          {pageOptions.map((option, i) => {
            return (
              <option key={i} value={option}>
                {option}
              </option>
            );
          })}
        </select>
        <button className="btn" disabled={!props.hasNextPage} onClick={handleNextPage}>
          {'Next >'}
        </button>
      </PaginationControls>
    </PaginationWrapper>
  );
}

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 4%;
`;

const PaginationControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px 1%;
  text-align: center;
  background: white;

  background: #104c8e;
  color: white;
  cursor: pointer;

  select {
    user-select: none;
    padding: 5px 7px;
    border: 1px solid gray;
    display: inline-block;
    margin: 0 5px;
  }
  .current {
    background: white;
    color: black;
    border: 1px solid gray;
    padding: 4px 8px;
    margin: 2px;
  }
  .btn {
    user-select: none;
    padding: 3px 5px;
    border: 1px solid gray;
    display: inline-block;
    margin: 3px 5px;
    min-width: 30px;
    background: white;
    color: black;

    &:hover {
      background: #e0e0f0;
    }

    &.activePage {
      background: #c0c0ff;
    }

    &.disabled {
      background: gray;
      color: lightgray;
      border-color: rgba(255, 255, 255, 0.2);
      cursor: not-allowed;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
`;