import React, { useState } from 'react';
import UserBox from './UserBox.js'
import ActiveIconBox from './ActiveIconBox.js';

const ActiveInfoBox = (props) => {

  return (
    <div className={`activeInfoBox ${props.isPlaying ?'selected' : ''}`}>
      <UserBox avatar={props.avatar} 
              username ={props.username} 
              userid={props.userid} 
              info={props.info} 
              onPlayClick={props.onPlayClick}/>
      <ActiveIconBox toggleComments={props.toggleComments}/>
    </div>
  )
}



export default ActiveInfoBox 