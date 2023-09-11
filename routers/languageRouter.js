import express from 'express';
import { getAllLanguagesController, getLanguageController, addLanguageController, deleteLanguageController } from '../controller/languageController.js';

export const languageRouter = express.Router();

languageRouter.get('/language', getAllLanguagesController);
languageRouter.get('/language/:languageid', getLanguageController);

languageRouter.post('/language/post', addLanguageController);
languageRouter.delete('/language/delete/:languageid', deleteLanguageController);