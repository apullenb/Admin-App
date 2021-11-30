/* eslint-disable jsx-a11y/img-redundant-alt */
import Moment from "react-moment";
import React from "react";
import { Link } from "react-router-dom";

const Entries = (props) => {
  const { editPermission, entry } = props;
  return (
    <tr id="row">
      <td>{entry.id}</td>
      <td>
        {entry.day1UploadDate && (
          <Moment format="MM/DD/YYYY">{entry.day1UploadDate}</Moment>
        )}
      </td>
      <td>{entry.ambassadorId}</td>
      <td>{entry.name}</td>
      <td>{entry.contestTitle}</td>
      <td>
        {entry.day1ImageUrl ? (
          <img alt="Day 1 Photo" src={entry.day1ImageUrl} width="50px" />
        ) : (
          <p style={{ margin: "0 2%" }}>No Image Submitted</p>
        )}
      </td>
      <td>
        {entry.day30ImageUrl ? (
          <img alt="Day 30 Photo" src={entry.day30ImageUrl} width="50px" />
        ) : (
          <p style={{ margin: "0 2%" }}>No Image Submitted</p>
        )}
      </td>
      {/* <td>{entry.isFeatured}</td>
            <td>{entry.isApproved}</td> */}
      <td>
        {editPermission && (
          <Link
            to={{
              pathname: `/Challenge/Entry/${entry.id}`,
              state: props.entry,
            }}
          >
            <button id="edit">Edit</button>
          </Link>
        )}
      </td>
    </tr>
  );
};

export default Entries;
