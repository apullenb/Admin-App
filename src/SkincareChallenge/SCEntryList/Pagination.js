import React, { useEffect, useState } from 'react';

const Pagination = (props) => {
const [pageNo, setPageNo] = useState(1);
const [perPage, setPerPage] = useState('');
const [pageOptions, setPageOptions] = useState([10,15,20]); 

const changePerPage = (e) => {
    setPerPage(e.target.value)
    props.getusers(perPage, pageNo)
}

const handlePrevPage = () => {
    pageNo > 1 ? setPageNo(pageNo -1) : setPageNo(1)
    props.getEntries(perPage, pageNo)
}

const handleNextPage = () => {
    setPageNo(pageNo +1)
    props.getEntries(perPage, pageNo)
}
    return (
        <div>
            <div className="paginationCtrls">
                <button onClick={handlePrevPage}>{"< Prev"}</button>
                Per Page: <select value={perPage} onChange={(e)=> {changePerPage(e)}}>
                    {pageOptions.map((option,i) => {
                        return (
                            <option key = {i} value={option}>{option}</option>
                        );
                    })}
                </select>
                <button onClick={handleNextPage}>{"Next >"}</button>
            </div>
        </div>
    )
}

export default Pagination;
