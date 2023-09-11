import {db} from '../config/db.js';

//GET ALL COMMENTS FROM DATABSE
export const getAllComments  = async ()=>{
    try {
        const commentList = await db('comments')
        .select('*')
        .returning(["commentid", "userid", "recordid", "text", "created", "updated"])
        // console.log("commentList=>",  commentList)
        return commentList;
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}

//GET COMMENT FROM DATABASE BY ID
export const getComment = async (commentid)=>{
    try {
        const comment = await db('comments')
        .select('*')
        .where('commentid', commentid)
        return comment;      
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
} 


//GET ALL COMMENTS RECORDS FROM DATABASE BY USERID
export const getCommentByUserId = async (userid)=>{
    try {
        const commentList = await db('comments')
        .select('*')
        .where('userid', userid)
        .returning(["commentid", "userid", "recordid", "text", "created", "updated"])
        // console.log("commentList=>",  commentList)
        return commentList;       
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}

//GET ALL COMMENTS RECORDS FROM DATABASE BY RECORDID
export const getCommentByAudioId = async (recordid)=>{
    try {
        const commentList = await db('comments')
        .select('*')
        .where('recordid', recordid)
        .returning(["commentid", "userid", "recordid", "text", "created", "updated"])
        // console.log("commentList=>",  commentList)
        return commentList;       
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}


//ADD COMMENT
export const addComment = ({userid, recordid, text}) => {
    return db('comments')
    .insert ({userid, recordid, text, created: new Date(), updated: new Date()})
    .returning(["commentid", "userid", "recordid", "text", "created", "updated"])
  }

//UPDATE COMMENT
export const updateComment = ({text}, commentid) => {
    return db('comments')
    .select('*')
    .where('commentid', commentid)
    .update({text})
    .returning(["commentid", "userid", "recordid", "text", "created", "updated"])
  }
  
  //DELETE COMMENT
  export const deleteComment = (commentid) => {
    return db('comments')
    .where('commentid', commentid)
    .del()
    .returning(["commentid", "userid", "recordid", "text", "created", "updated "])
  }
