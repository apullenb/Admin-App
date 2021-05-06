import React from "react";
import { Link } from "react-router-dom";

function Accounts(props) {
  const user = props.users;

  return (
    <tr id="row">
      <td>{user.accountId}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.ambassadorID}</td>
      <td>{user.lastLogin}</td>
      <td>{user.lastChallenge}</td>
      <td>
        <Link
          to={{
            pathname: `/Skincare-Challenge-Account-Edit/${user.accountId}`,
            state: user,
          }}
        >
          <button id="edit">Edit</button>
        </Link>
      </td>
    </tr>
  );
}

export default Accounts;
