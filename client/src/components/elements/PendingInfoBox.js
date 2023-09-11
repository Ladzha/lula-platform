import React from 'react';
import UserBox from './UserBox.js'
import PendingIconBox from './PendingIconBox.js';


const PendingInfoBox = (props) => {


  return (
    <div className={`pendingInfoBox ${props.isPlaying ?'selected' : ''}`}>
        <UserBox avatar={props.avatar} username ={props.username} userid={props.userid} info={props.info} onPlayClick={props.onPlayClick}/>
        <PendingIconBox recordid={props.recordid}/>
    </div>
  )
}

export default PendingInfoBox 