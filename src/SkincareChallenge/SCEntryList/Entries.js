import React from 'react';
import { Link } from "react-router-dom";

const Entries = (props) => {
    const entry = props.entries;

    return (
        <tr id="row">
            <td>{entry.id}</td>
            <td>{entry.createdDate}</td>
            <td>Ambassador ID Here</td>
            <td>{entry.name}</td>
            <td>{entry.contestTitle}</td>
            <td><img src={entry.day1ImageUrl} width="50px"/></td>
            <td><img src={entry.day30ImageUrl}width="50px"/></td>
            <td>{entry.isFeatured}</td>
            <td>{entry.isApproved}</td>
            <td>
            <Link
          to={{
            pathname: `/Skincare-Challenge-Entry-Edit/${entry.id}`,
            state: entry,
          }}
        >
          <button id="edit">Edit</button>
        </Link>
            </td>
       </tr>
    )
}

export default Entries;
