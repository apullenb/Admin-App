import React, {useEffect, useState} from 'react'

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
            <div className="paginationCtrls">
            <button onClick={handlePrevPage}>{"< Prev"}</button>
          Per Page: <select value={perPage} onChange={(e) =>{changePerPage(e)}} >
              {pageOptions.map((option, i) => {
                return (
                  <option key={i} value={option} >{option}</option>
                );
              })}
            </select>
          <button onClick={handleNextPage}>{"Next >"}</button>
        </div>
        </div>
    )
}

export default Pagination
