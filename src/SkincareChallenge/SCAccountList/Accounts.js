import React from 'react'

function Accounts(props) {

    const user = props.users

    return (
        
            <tr id='row'>
                <td>{user.accountId}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.ambassadorID}</td>
                <td>{user.lastLogin}</td>
                <td>{user.lastChallenge}</td>
                <td><input type='checkbox' /></td>
            </tr>
        
    )
}

export default Accounts
