import express from 'express';
import { getAllSectionController, getSectionController, addSectionController, updateSectionController, deleteSectionController } from '../controller/sectionController.js';

export const sectionRouter = express.Router();

sectionRouter.get('/section', getAllSectionController);
sectionRouter.get('/section/:sectionid', getSectionController);

sectionRouter.post('/section/post', addSectionController);
sectionRouter.put('/section/update/:sectionid', updateSectionController);
sectionRouter.delete('/section/delete/:sectionid', deleteSectionController);