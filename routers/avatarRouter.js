import express from 'express';
import { getAllAvatarsController, getAvatarController, addAvatarController, deleteAvatarController } from '../controller/avatarController.js';

export const avatarRouter = express.Router();

avatarRouter.get('/avatar', getAllAvatarsController);
avatarRouter.get('/avatar/:avatarid', getAvatarController);
avatarRouter.post('/avatar/post', addAvatarController);
avatarRouter.delete('/avatar/delete/:avatarid', deleteAvatarController);
