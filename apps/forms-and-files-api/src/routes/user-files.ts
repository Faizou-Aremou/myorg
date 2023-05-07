import express from 'express';
import { addFiles, addUser } from '../controllers/user-files';
export const userFilesRouter = express.Router();

userFilesRouter.post('/files', addFiles);
userFilesRouter.post('/user', addUser);