import React from 'react';
import {useState, useEffect, useContext} from 'react';
import CommentForm from './CommentForm';
import CommentElement from './CommentElement';
import { CommentService } from '../../services/comment.service.js';
import { AppContext } from '../../App.js';
import jwtDecode from 'jwt-decode';


const CommentsBlock = ({recordid}) => {

    const [commentForm, setCommentForm] = useState(false)
    const [comments, setComments]=useState([]);
    const { token } = useContext(AppContext);
    const [userid, setUserid] = useState('');


    useEffect(() => {
      const fetchData = async () => {
        try {
          const commentsData = await CommentService.getByAudioId(recordid)
          setComments(commentsData);    
          } catch (error) {
              console.log(error);
          }
      };
            fetchData();
    }, []);

    useEffect(()=>{
      if(token){
        const decodedToken = jwtDecode(token); 
        setUserid(decodedToken.userid);
      }else{
        console.log("There is no token");
      }
  }, [token])

    const handleComment = ()=>{
        setCommentForm(!commentForm)
    }

    return (
      <div className="listComment">
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index}>
              <CommentElement
                id={comment.commentid}
                userid={comment.userid}
                text={comment.text}
                created={new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                }).format(new Date(comment.created))}
              />
            </div>
          ))
        ) : (
          <span className='information'>No comments yet</span>
        )}
  
        {token && (
          <>
            <button className="submitButton addButton" onClick={handleComment}>
              {commentForm ? 'Hide form' : 'Leave a comment'}
            </button>
            {commentForm && (
              <CommentForm
                recordid={recordid}
                userid={userid}
                setCommentForm={setCommentForm}
              />
            )}
          </>
        )}
      </div>
    );
  };

//   return (
//     <div className='listComment'> 
//     {comments ? (
//       comments.length>0 && comments.map((comment, index)=> { 
//         <div key={index}>
//         <CommentElement 
//         id={comment.commentid} userid={comment.userid} text={comment.text} 
//         created={new Intl.DateTimeFormat('en-US', {
//           year: 'numeric',
//           month: '2-digit',
//           day: '2-digit'
//       }).format(new Date(comment.created))}/>
//         </div>))):(<span>No comments yet</span>)

//       { token&& <>
//         <button className='submitButton addButton' onClick={handleComment}>
//         {commentForm? 'Hide form' : 'Leave a comment'}</button>
//         {commentForm && <CommentForm recordid={recordid} userid={userid} setCommentForm={setCommentForm}/>}</> 
//       )} 
//     </div>
//   );
// }

export default CommentsBlock