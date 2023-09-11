import React, {useRef} from 'react'
import {useState, useEffect} from 'react';
import UserBox from '../elements/UserBox.js'
import { CommentService } from '../../services/comment.service.js';
import { UserService } from '../../services/user.service.js';
import { AvatarService } from '../../services/avatar.service.js';

const CommentForm = ({recordid, userid, setCommentForm}) => {

  const formRef = useRef();

  const [user, setUser]=useState([{}]);
  const [avatar, setAvatar]=useState([{}]);
  
  useEffect(() => {
    if (!userid) return;
    const fetchData = async () => {
      try {
        const userData = await UserService.getById(userid);
        setUser(userData);

        if (userData.avatarid) {
          const avatarData = await AvatarService.getById(userData.avatarid);
          setAvatar(avatarData);
          }

        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
}, [recordid, userid]);


  const handleCommentSubmit = async (event)=>{
    event.preventDefault()
    const userComment = event.target.commentInput.value;

    if(userComment !=""){
      try {
        const commentData = await CommentService.postComment(userid, recordid, userComment);
        console.log('Comment posted:', commentData);
  
        event.target.commentInput.value = ''; // Clear the textarea
  
      } catch (error) {
        console.log(error);
      }
      setCommentForm(false)
      console.log(userComment);
    }
    else{
      event.target.commentInput.placeholder="Empty comment"
    }
  }

  const handleCleanComment  = ()=>{
    formRef.current.commentInput.value = ''; // Clear the textarea
  }
  return (
      <div className='newCommentBlock'>
      <UserBox avatar={avatar[0].link} username ={user.username} userid ={user.userid} info={user.about}/>
      <form 
      className='newComment' 
      onSubmit={(event)=>handleCommentSubmit(event)}
      ref={formRef}>

        <textarea 
        className='newCommentText' type='text' 
        maxLength={300} rows={7} cols={40}
        name='commentInput' placeholder="Remember to be polite"/>

        <button className='submitButton addButton' type="submit">Submit</button>
      </form> 
      <p className='hint' onClick={handleCleanComment }>Clean comment</p>

      </div>
  )
}

export default CommentForm