
import {getAllPending, getPending, addPending, deletePending, getPendingWithUserInfo, uploadSingle} from '../models/pendingModel.js'

//GET ALL AUDIO
export const getAllPendingController = async (request, response) => {
    try {
        const pendingAudioList = await getAllPending();
        response.json(pendingAudioList);
    } catch (error) {
        console.log(error);
        response.status(500).json({ msg: 'Failed to fetch pending audios.' });
    }
} 

//GET PENDINGAUDIO BY ID
export const getPendingController= async(request, response)=>{
    const recordid = request.params.recordid;
    try {
        const pendingAudio = await getPending(recordid);
        if(pendingAudio){
            response.json(pendingAudio);
        }else{
            response.status(404).json({ msg: 'Record not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch record.'})
        }
}

//ADD AUDIO
export const addPendingController = async(request, response)=>{
    const imgid = request.body.imgid;
    const userid = request.body.userid;
    const link = request.body.link;
    try {
        const audio = await addPending({userid, link, imgid})
        response.json(audio)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message})
        }
}

//DELETE AUDIO
export const deletePendingController = async(request, response)=>{
    const recordid = request.params.recordid;
    try {
        await deletePending(recordid);
        response.json({ msg: 'Record deleted successfully.'});
            
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to delete record.' });
        }
}


//GET ALL AUDIO WITH USER INFO
export const getPendingWithUserInfoController = async (request, response) => {
    const recordid = request.params.recordid;
    try {
        const pendingAudioList = await getPendingWithUserInfo(recordid);
        response.json(pendingAudioList);
    } catch (error) {
        console.log(error);
        response.status(500).json({ msg: 'Failed to fetch pending audios.' });
    }
} 

export const _uploadSingle = async (req, res) => {
    const imgid = req.body.imgid ;
    const userid = req.body.userid ;
    try {
      const row = await uploadSingle(req.file, imgid, userid);
      
      res.json(row);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};