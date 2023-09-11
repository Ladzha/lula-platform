import express from 'express';
import { getAllImgController, getImgController, getImgSectionController, getImgLanguageController, addImgController, updateImgController, deleteImgController, getImgInfoController } from '../controller/imgController.js';

export const imgRouter = express.Router();

imgRouter.get('/img', getAllImgController);
imgRouter.get('/img/:imgid', getImgController);

imgRouter.get('/img/section/:sectionid', getImgSectionController);

imgRouter.get('/img/language/:languageid', getImgLanguageController);

imgRouter.get('/img/details/:imgid', getImgInfoController);


imgRouter.post('/img/post', addImgController);
imgRouter.put('/img/update/:imgid', updateImgController);
imgRouter.delete('/img/delete/:imgid', deleteImgController);

// imgRouter.post('/img/getaudio', getAudioAndCommentsByImgIdController);