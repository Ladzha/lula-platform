import express from 'express';
import { getAllUsersController, getUserController, registerController, loginController, logoutController, updateUserController, deleteUserController } from '../controller/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const userRouter = express.Router();
userRouter.get('/users', getAllUsersController) 
userRouter.get('/users/:userid', getUserController)

userRouter.post('/users/register', registerController)
userRouter.post('/users/login/', loginController)
userRouter.delete('/users/logout/', logoutController)

userRouter.put('/users/update/:userid', updateUserController)
userRouter.delete('/users/delete/:userid', deleteUserController)

userRouter.get("/verify", authMiddleware, (req, res) => {  
    res.sendStatus(200);
});

