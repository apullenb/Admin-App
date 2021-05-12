import React, {useEffect, useState} from 'react'

function Pagination() {

    const [pageOptions, setPageOptions] = useState([10, 15, 30, 60])
    const [totalUsers, setTotalUsers] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(8)
    const [totalPages, setTotalPages] = useState(1)
    const [pageNo, setPageNo] = useState([1,2,])


const changePage = (e) => {

}

const changePerPage = () => {

}


    return (
        <div>
            <div className="paginationCtrls">
          <form>
            Per Page: <select value={perPage} onChange={changePerPage}>
              {pageOptions.map((option, i) => {
                return (
                  <option key={i} value={option}>{option}</option>
                );
              })}
            </select>
            <a className={`btn ${currentPage === 1 ? "hide" : ""}`} onClick={e => changePage(e, 1)}>{'<<'}</a>
            <a className={`btn ${currentPage === 1 ? "hide" : ""}`} onClick={e => changePage(e)}>{'<'}</a>
            {pageNo.map((page, i) => {
              return (
                <a className={`btn ${currentPage === page ? "activePage" : ""}`} key={i} onClick={e => changePage(e, page)}>{page}</a>
              );
            })}
            <a className={`btn ${currentPage === totalPages ? "disable" : ""}`} onClick={e => changePage(e, currentPage + 1)}>{'>'}</a>
            <a className={`btn ${currentPage === totalPages ? "disable" : ""}`} onClick={e => changePage(e, totalPages)}>{'>>'}</a>
            Page: {currentPage} of {totalPages} 
          </form>
        </div>
        </div>
    )
}

export default Pagination
