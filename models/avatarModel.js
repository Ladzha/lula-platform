import {db} from '../config/db.js';

export const getAllAvatars  = async ()=>{
    try {
        const avatarList = await db('avatars')
        .select('*')
        .returning(["avatarid", "name", "link"])
        // console.log("avatarList=>",  avatarList)
        return avatarList;
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}

//GET AVATAR BY ID
export const getAvatar = async (avatarid)=>{
    try {
        const avatar = await db('avatars')
        .select('*')
        .where('avatarid', avatarid)
        return avatar;      

    } catch (error) {
        console.log(error); 
        throw new Error(error.message);    
    }
}

//ADD AVATAR
export const addAvatar = ({name, link}) => {
    return db('avatars')
    .insert ({name, link})
    .returning(["avatarid", "name", "link"])
  }
  
  //DELETE AVATAR
  export const deleteAvatar = (avatarid) => {
    return db('avatars')
    .where('avatarid', avatarid)
    .del()
    .returning(["avatarid", "name", "link"])
  }
