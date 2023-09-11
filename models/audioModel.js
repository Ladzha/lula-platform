import {db} from '../config/db.js';

//GET ALL RECORDS FROM DATABASE
export const getAllAudios  = async ()=>{
    try {
        const audioList = await db('audios')
        .select(
        "audios.recordid", 
        "audios.userid", 
        "audios.created", 
        "audios.likes", 
        "audios.imgid",
        'audios.link')
        // 'uploads.location as link_integer')
        // .leftJoin('uploads', 'link_integer', '=', 'uploads.id')
        return audioList;       
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}

//GET RECORD FROM DATABASE BY ID
export const getAudio = async (recordid)=>{
    try {
        const audio = await db('audios')
        .select(
            "audios.recordid", 
            "audios.userid", 
            "audios.created", 
            "audios.likes", 
            "audios.imgid",
            'audios.link')
            // ,
            // 'uploads.location as link_integer')
            // .leftJoin('uploads', 'link_integer', '=', 'uploads.id')
        .where('audios.recordid', recordid)
        return audio;      

    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}


//GET ALL USERS RECORDS FROM DATABASE BY USERID
export const getAudioByUserId = async (userid)=>{
    try {
        const audioList = await db('audios')
        .select(
            "audios.recordid", 
            "audios.userid", 
            "audios.created", 
            "audios.likes", 
            "audios.imgid",
            'audios.link')
            // ,
            // 'uploads.location as link_integer')
            // .leftJoin('uploads', 'link_integer', '=', 'uploads.id')
        .where('audios.userid', userid)
        console.log("audioList=>",  audioList)
        return audioList;       
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}

export const getAudioByImgId = async (imgid)=>{
    try {
        const audioList = await db('audios')
        .select(
            "audios.recordid", 
            "audios.userid", 
            "audios.created", 
            "audios.likes", 
            "audios.imgid",
            'audios.link')
            // ,
            // 'uploads.location as link_integer')
            // .leftJoin('uploads', 'link_integer', '=', 'uploads.id')
        .where('audios.imgid', imgid)
          return audioList;       
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}

//ADD AUDIO
export const addAudio = ({userid, link, imgid}) => {
    return db('audios')
    .insert ({userid, link, imgid})
    .returning(["recordid", "userid", "link", "created", "likes", "imgid"])
}

//UPDATE AUDIO
export const updateAudio = ({likes}, recordid) => {
    return db('audios')
    .where('recordid', recordid)
    .update({likes})
    .returning(["recordid", "userid", "link", "created", "likes", "imgid"])
}
  
  //DELETE AUDIO
  export const deleteAudio = (recordid) => {
    return db('audios')
    .where('recordid', recordid)
    .del()
  }
