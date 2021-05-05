import React, {useState, useEffect} from 'react'
import PageWrapper from '../../GlobalComponents/PageWrapper'
import data from './testaccountsdata'
import './AccountList.css'
import Accounts from './Accounts';



function AccountList() {

    const [users, setUsers] = useState('');

    const getUsers = () => {
        // needs to be created once the backend for this is finished
        setUsers(data)
        console.log(data)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <PageWrapper>
                <h1>Skincare Challenge Accounts</h1>
                <table className='account-table'>
            <tr>
                
                <td id='filter'><input type='text' defaultValue='Account ID' /></td>
                <td id='filter'><input type='text' defaultValue='Name' /></td>
                <td id='filter'><input type='text' defaultValue='Email' /></td>
                <td id='filter'><input type='text' defaultValue='Ambassador ID' /></td>
                <td id='filter'><input type='text' defaultValue='Last Login' /></td>
                <td id='filter'>
                    <select id='filter'>
                    <option selected value='Challenge'>Challenge</option>       
                <option value='2020 Q3'>2020 Q3</option>
                <option value='2020 Q4'>2020 Q3</option>
                <option value='2021 Q1'>2021 Q1</option>
                <option value='2021 Q2'>2021 Q2</option>
                <option value='2021 Q3'>2021 Q3</option>
                </select>
                </td>
                <td></td>
            </tr>
        <tr>
          <th className="head">Account ID</th>
          <th className="head">Name</th>
          <th className="head">Email</th>
          <th className="head">AmbassadorID </th>
          <th className="head">Last Login </th>
          <th className="head">Last Challenge </th>
          <th className="head">Actions </th>
        </tr>
    {users !== '' && users.map((user, i) => {
        return (
            <Accounts users={user} />
        )
    })}
        </table>
            </PageWrapper>
        </div>
    )
}

export default AccountList
