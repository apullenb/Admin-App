import React from "react";
import { Link } from "react-router-dom";

function Accounts(props) {
  const user = props.users;

  return (
    <tr id="row">
      <td>{user.userId}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.ambassadorId}</td>
      <td>{user.lastLoginDate}</td>
      <td>{user.lastChallenge}</td>
      <td>
        <Link
          to={{
            pathname: `/Skincare-Challenge-Account-Edit/${user.userId}`,
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
