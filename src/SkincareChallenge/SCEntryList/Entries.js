/* eslint-disable jsx-a11y/img-redundant-alt */
import Moment from 'react-moment';
import React from 'react';
import { Link } from "react-router-dom";

const Entries = (props) => {
    return (
        <tr id="row"> 
            <td>{props.entry.id}</td>
            <td>{props.entry.day1UploadDate && <Moment format="MM/DD/YYYY">{props.entry.day1UploadDate}</Moment>}</td>
            <td>{props.entry.ambassadorId}</td>
            <td>{props.entry.name}</td>
            <td>{props.entry.contestTitle}</td>
            <td>{props.entry.day1ImageUrl ? <img alt="Day 1 Photo" src={props.entry.day1ImageUrl} width="50px"/> : <p style={{margin: '0 2%'}}>No Image Submitted</p>}</td>
            <td>{props.entry.day30ImageUrl ? <img alt="Day 30 Photo" src={props.entry.day30ImageUrl} width="50px"/>: <p style={{margin: '0 2%'}}>No Image Submitted</p>}</td>
            {/* <td>{props.entry.isFeatured}</td>
            <td>{props.entry.isApproved}</td> */}
            <td>
            <Link
          to={{
            pathname: `/Challenge/Entry/${props.entry.id}`,
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
