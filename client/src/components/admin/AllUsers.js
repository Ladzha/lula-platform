import React from 'react';
import {UserService} from '../../services/user.service.js'
import {useState, useEffect, useContext} from 'react';

const AllUsers = () => {

    const [users, setUsers]=useState([]);
    
    useEffect(()=>{
        const fetchData = async ()=>{
            const data = await UserService.getAll()
            setUsers(data)
        }
        fetchData()
    },[])

  return (
    <div className='box'>AllUsers
        <ul>
        {users.length>0 && users.map(user=> { 
            return (<div className='hint'>
            <li key={user.id}>
            <p>User Id: {user.userid}</p>
            <p>User Username: {user.username}</p>
            <p>User first Name: {user.firstname}</p>
            </li>
            </div>)
            
            })}
        </ul>
    </div>
  )
}

export default AllUsers