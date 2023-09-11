import React, { useState, useEffect} from 'react'
import { AvatarService } from '../../services/avatar.service.js';
import { UserService } from '../../services/user.service.js';
import { AudioService } from '../../services/audio.service.js';
import ActiveInfoBox from '../elements/ActiveInfoBox.js'
import CommentsBlock from './CommentsBlock.jsx'

const AudioComponent = ({id, created, onPlayClick, isPlaying, currentTrackIndex}) => {

    const [audio, setAudio]=useState([{}]);
    const [user, setUser]=useState([{}]);
    const [avatar, setAvatar]=useState([{}]);
    const [commentBlock, setCommentBlock] =useState(false)
    
    const toggleComments = () => {
      setCommentBlock(!commentBlock);
    };

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const audioData = await AudioService.getById(id);
        setAudio(audioData);

        if(audioData[0].userid){
          const userData = await UserService.getById(audioData[0].userid);
          setUser(userData);

        if (userData.avatarid) {
          const avatarData = await AvatarService.getById(userData.avatarid);
          setAvatar(avatarData);
          }
        }
        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
  }, [id]);
 
  
  return (
    <div className='listBox'>
      <div className='infoBlock'>   
        <ActiveInfoBox avatar={avatar[0].link} 
        username={user&&user.username} 
        userid={user&&user.userid} 
        info={created} toggleComments={toggleComments} 
        isPlaying={isPlaying}
        onPlayClick={onPlayClick}
        id={id}
        currentTrackIndex={currentTrackIndex}/>
        {commentBlock && <CommentsBlock recordid={audio[0].recordid}/>}             
    </div>
    </div>
  )
}

export default AudioComponent