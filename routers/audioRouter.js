import express from 'express';
import { getAllAudiosController, getAudioController, getUserAudioController, getAudioByImgIdController, addAudioController, updateAudioController, deleteAudioController} from '../controller/audioController.js';
import { getAllPendingController, getPendingController, addPendingController, deletePendingController, getPendingWithUserInfoController, _uploadSingle } from '../controller/pendingController.js';
import { upload } from '../utils/upload.utils.js'


export const audioRouter = express.Router();
audioRouter.get('/audio', getAllAudiosController);
audioRouter.get('/audio/:recordid', getAudioController);
audioRouter.get('/audio/records/:userid', getUserAudioController);

audioRouter.get('/audio/exercise/records/:imgid', getAudioByImgIdController);

audioRouter.post('/audio/post', addAudioController); 
audioRouter.put('/audio/update/:recordid', updateAudioController);  
audioRouter.delete('/audio/delete/:recordid', deleteAudioController); 

audioRouter.get('/pending', getAllPendingController); 

audioRouter.get('/pending/info/userinfo/:recordid', getPendingWithUserInfoController); 

audioRouter.get('/pending/:recordid', getPendingController); 
audioRouter.post('/pending/post', addPendingController); 
audioRouter.delete('/pending/delete/:recordid', deletePendingController); 

audioRouter.post("/pending/upload-single", upload.single("file"), _uploadSingle); 