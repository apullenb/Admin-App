import React from 'react';
import { createPortal } from 'react-dom';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const Entries = (props) => {
  const dispatch = useDispatch();
 // const { entries } = useSelector(state => state.entries)

    return (
        <tr id="row"> 
            <td>{props.entry.id}</td>
            <td>{props.entry.createdDate}</td>
            <td>{props.entry.ambassadorId}</td>
            <td>{props.entry.name}</td>
            <td>{props.entry.contestTitle}</td>
            <td><img src={props.entry.day1ImageUrl} width="50px"/></td>
            <td><img src={props.entry.day30ImageUrl}width="50px"/></td>
            <td>{props.entry.isFeatured}</td>
            <td>{props.entry.isApproved}</td>
            <td>
            <Link
          to={{
            pathname: `/Skincare-Challenge-Entry-Edit/${props.entry.id}`,
            state: props.entry,
          }}
        >
          <button id="edit">Edit</button>
        </Link>
            </td>
       </tr>
    )
}

export default Entries;
