import React from 'react'
import { Link } from 'react-router-dom';

const UserBox = (props) => {
  return (
    <div className='userBox'> 

      <Link to={`/profile/${props.userid}`} ><img className='userIcon' src={props.avatar} alt="user-avatar"></img></Link>
      <div className='infoTextBox' onClick={props.onPlayClick}>
      <p className='infoName'>{props.username}</p>
      <p className='infoText'>{props.info}</p>
      </div>

    </div>

  )
}

export default UserBox 