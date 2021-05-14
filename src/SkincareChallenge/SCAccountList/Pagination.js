import React, {useEffect, useState} from 'react'
import styled from 'styled-components';

function Pagination(props) {

  const [pageNo, setPageNo] = useState(1);
  const [perPage, setPerpage] = useState('');
  const [totalUsers, setTotalUsers] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageOptions, setPageOptions] = useState([10, 15, 20])


  const changePerPage = (e) => {
    setPerpage(e.target.value)
    props.getusers(perPage, pageNo)
    console.log(perPage)
  }

  const handlePrevPage =() => {
    pageNo > 1 ? setPageNo(pageNo -1) : setPageNo(1)
    props.getusers(perPage, pageNo)
    console.log(pageNo)
  }

  const handleNextPage = () => {
    setPageNo(pageNo +1) 
    props.getusers(perPage, pageNo)
  }

  return (
    <div>
        <PaginationControls>
          <button onClick={handlePrevPage}>{"< Prev"}</button>
            Per Page: <select value={perPage} onChange={(e) =>{changePerPage(e)}} >
            {pageOptions.map((option, i) => {
              return (
                <option key={i} value={option} >{option}</option>
              );
            })}
          </select>
        <button onClick={handleNextPage}>{"Next >"}</button>
      </PaginationControls>
    </div>
  )
}

export default Pagination

const PaginationControls = styled.div`
  padding: 10px 2%;
  text-align: center;
  background: white;
  width: 100%;
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

    &.disable {
      background: rgba(255, 255, 255, 0.1);
      color: lightgray;
      border-color: rgba(255, 255, 255, 0.2);
      cursor: not-allowed;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }

`
