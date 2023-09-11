import React from 'react'

import {useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';    
import { AudioService } from '../../services/audio.service.js';
import { CommentService } from '../../services/comment.service.js';
import { UserService } from '../../services/user.service.js';
import { AvatarService } from '../../services/avatar.service.js';
       
import AudioPlayer from '../audio/audioPlayer/AudioPlayer'
import UserBox from '../elements/UserBox.js';

import { AppContext } from '../../App.js';
import jwtDecode from 'jwt-decode';


const Profile = () => {

  const { userid } = useParams();

  const [audios, setAudios]=useState([]);
  const [comments, setComments]=useState([]);
  const [user, setUser]=useState([{}]);
  const [avatar, setAvatar]=useState([{}]);

  const [currentUserId, setCurrentUserId]=useState('');
  
  const { token } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {

        if(userid) {
          const userData = await UserService.getById(userid)
          setUser(userData);  
          
          if(!userData) return;
  
          if(userData.avatarid){
            const avatarData = await AvatarService.getById(userData.avatarid)
            setAvatar(avatarData);

            const audioData = await AudioService.getByUserId(userid)
            setAudios(audioData);   

          }

          const commentData = await CommentService.getByUserId(userid)
          setComments(commentData);   

  

        }

        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
  }, [userid]);
        
  useEffect(()=>{
    if(token){
      const decodedToken = jwtDecode(token); 
      setCurrentUserId(decodedToken.userid);
    }else{
      console.log("There is no token");
    }
}, [token])


  return (
    <div className='containerColumn'> 
    <p className='titleMain'> {currentUserId == userid ? `My account: ${user.username}` : `${user.username}'s Profile`} </p>

      <div className='profileContainer'>
        <img className='userIconInProfile' src={avatar[0].link} alt="user-avatar"></img>
        <p className="loading">My name is: <span className='bold'>{user.firstname}</span> </p>
        <p className="loading">Something about me: <span className='bold'>{user.about}</span></p>

        {audios?(
        <div className='profileColumn'>

        {audios.length > 0 && <div className= 'box listRecord'>
        <AudioPlayer playlist={audios}/>    
        </div>}

        {comments.length > 0 && <div className= 'box listRecord'>
          {comments.map((comment, index)=>{
            return(
              <div className='commentBlock' key={index}>
              <UserBox avatar={avatar[0].link} username ={user.username} userid={user.userid}
              info={new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).format(new Date(comment.created))}/>
              <div className='commentBox'>{comment.text}</div> 
              </div>
              
            )})}

          </div>}

      </div>):(<p className="loading">I published nothing yet</p>)}
      
      </div>
    </div>
  )
}

export default Profile


        //user info: username, his avatars, text about, his records, hes comments, his 
