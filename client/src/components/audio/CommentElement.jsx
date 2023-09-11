import React from 'react';
import {useState, useEffect} from 'react';
import { AvatarService } from '../../services/avatar.service.js';
import { UserService } from '../../services/user.service.js';
import UserBox from '../elements/UserBox.js'

const CommentElement = ({ id, userid, text, created}) => {

    const [user, setUser]=useState([{}]);
    const [avatar, setAvatar]=useState([{}]);


    useEffect(() => {
      if (!id) return;
      const fetchData = async () => {
        try {

          if(userid){
            const userData = await UserService.getById(userid);
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
    <div className='commentBlock'>
     <UserBox avatar={avatar[0].link} userid={user.userid} username ={user.username} info={created}/>
    <div className='commentBox'>{text}</div>
    </div>
  )
}

export default CommentElement

