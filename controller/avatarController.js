import { getAllAvatars, getAvatar, addAvatar, deleteAvatar} from '../models/avatarModel.js';

//GET ALL AVATARS
export const getAllAvatarsController = async(request, response)=>{
    try {
        const avatarList = await getAllAvatars();
        response.json(avatarList)           
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch avatars.'})
        }
} 

//GET AVATAR BY ID
export const getAvatarController= async(request, response)=>{
    const avatarid = request.params.avatarid;
    try {
        const avatar = await getAvatar(avatarid);
        if(avatar){
            response.json(avatar);
        }else{
            response.status(404).json({ msg: 'Avatar not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch avatar.'})
        }
}

//ADD AVATAR
export const addAvatarController = async(request, response)=>{
    const avatarid = request.body.avatarid;
    const name = request.body.name;
    const link = request.body.link;
    try {
        const avatar = await addAvatar({avatarid, name, link})
        response.json(avatar)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message})
        }
}

//DELETE AVATAR
export const deleteAvatarController = async(request, response)=>{
    const avatarid = request.params.avatarid;
    try {
        await deleteAvatar(avatarid);
        response.json({ msg: 'Avatar deleted successfully.'});
            
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to delete avatar.' });
        }
}