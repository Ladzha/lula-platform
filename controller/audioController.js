import {getAllAudios, getAudio, getAudioByUserId, getAudioByImgId, addAudio, updateAudio, deleteAudio} from '../models/audioModel.js'

//GET ALL AUDIOS
export const getAllAudiosController = async(request, response)=>{
    try {
        const audioList = await getAllAudios();
        response.json(audioList)           
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch audios.'})
        }
}

//GET AUDIO BY ID
export const getAudioController= async(request, response)=>{
    const recordid = request.params.recordid;
    try {
        const audio = await getAudio(recordid);
        if(audio){
            response.json(audio);
        }else{
            response.status(404).json({ msg: 'Audio not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch audio.'})
        }
}

//GET LIST OF AUDIOS BY USERID
export const getUserAudioController= async(request, response)=>{
    const userid = request.params.userid;
    try {
        const audios = await getAudioByUserId(userid);
        if(audios){
            response.json(audios);
        }else{
            response.status(404).json({ msg: 'Record not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch record.'})
        }
}

//GET LIST OF AUDIOS BY IMGID
export const getAudioByImgIdController= async(request, response)=>{
    const imgid = request.params.imgid;
    try {
        const audios = await getAudioByImgId(imgid);
        if(audios){
            response.json(audios);
        }else{
            response.status(404).json({ msg: 'Record not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch record.'})
        }
}

//ADD AUDIO
export const addAudioController = async(request, response)=>{
    const userid = request.body.userid;
    const link = request.body.link;
    const imgid = request.body.imgid;
    try {
        const audio = await addAudio({userid, link, imgid})
        response.json(audio)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message})
        }
}

//UPDATE AUDIO
export const updateAudioController = async(request, response)=>{
    const recordid = request.params.recordid
    const likes = request.body.likes;

    try {
        const audio = await updateAudio({likes}, recordid)
        response.json(audio)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message}) 
        }
}

//DELETE AUDIO
export const deleteAudioController = async(request, response)=>{
    const recordid = request.params.recordid;
    try {
        await deleteAudio(recordid);
        response.json({ msg: 'Record deleted successfully.'});
            
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to delete record.' });
        }
}