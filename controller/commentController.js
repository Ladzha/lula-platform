import {getAllComments, getComment, getCommentByUserId, getCommentByAudioId, addComment, updateComment, deleteComment} from '../models/commentModel.js'

//GET ALL COMMENTS
export const getAllCommentController = async(request, response)=>{
    try {
        const commentList = await getAllComments();
        response.json(commentList)           
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch comments.'})
        }
}

//GET COMMENT BY ID
export const getCommentController= async(request, response)=>{
    const commentid = request.params.commentid;
    try {
        const comment = await getComment(commentid);
        if(comment){
            response.json(comment);
        }else{
            response.status(404).json({ msg: 'Comment not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch comment.'})
        }
}


//GET LIST OF COMMENTS BY USERID
export const getUserCommentController= async(request, response)=>{
    const userid = request.params.userid;
    try {
        const comments = await getCommentByUserId(userid);
        if(comments){
            response.json(comments);
        }else{
            response.status(404).json({ msg: 'Comment not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch comment.'})
        }
}



//GET LIST OF COMMENTS BY USERID
export const getCommentByAudioIdController= async(request, response)=>{
    const recordid = request.params.recordid;
    try {
        const comments = await getCommentByAudioId(recordid);
        if(comments){
            response.json(comments);
        }else{
            response.status(404).json({ msg: 'Comment not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch comment.'})
        }
}

//GET COMMENT BY AUDIO ID
export const getAudioCommentController= async(request, response)=>{
    const audioid = request.params.audioid;
    try {
        const comment = await getCommentByAudioId(audioid);
        if(comment){
            response.json(comment);
        }else{
            response.status(404).json({ msg: 'Comment not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch comment.'})
        }
}

//ADD COMMENT
export const addCommentController = async(request, response)=>{
    const userid = request.body.userid;
    const recordid = request.body.recordid;
    const text = request.body.text;
    const created = request.body.created;
    const updated = request.body.updated;

    try {
        const comment = await addComment({userid, recordid, text, created, updated})
        response.json(comment)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message})
        }
} 

//UPDATE COMMENT
export const updateCommentController = async(request, response)=>{
    const commentid = request.params.commentid;
    const text = request.body.text;
    try {
        const comment = await updateComment({commentid, text})
        response.json(comment)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message}) 
        }
}

//DELETE COMMENT
export const deleteCommentController = async(request, response)=>{
    const commentid = request.params.commentid;
    try {
        await deleteComment(commentid);
        response.json({ msg: 'Comment deleted successfully.'});
            
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to delete comment.' });
        }
}