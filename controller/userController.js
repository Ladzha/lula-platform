import {getAllUsers, register, login, updateUser, deleteUser, getUser} from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

//Create token
const generateAccessToken = async (userid, username, role) => {

    const payload = { userid, username, role}
    // console.log('payload from userController', payload);

    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1d'}) //Token expires in 1 day

}


//GET ALL USERS
export const getAllUsersController = async(request, response)=>{
    try {
        const usersList = await getAllUsers();
        response.json(usersList)           
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch users.'})
        }
}

//FIND USER
export const getUserController= async(request, response)=>{
    const userid = request.params.userid;
    try {
        const user = await getUser(userid);
        if(user){
            response.json(user);
        }else{
            res.status(404).json({ msg: 'User not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch user.'})
        }
}

//REGISTER USER
export const registerController = async(request, response)=>{
    const username = request.body.username;
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const email = request.body.email;
    const password = request.body.password +''; //to make it string
    const avatarid = request.body.avatarid;

    //hide password
    const salt = bcrypt.genSaltSync(5)
    const hashPassword = bcrypt.hashSync(password, salt)

    try {
        const rows = await register(username, firstname, lastname, email, hashPassword, avatarid)
        response.json(rows)

        } catch (error) {
            console.log(error)
            response.status(404).json({msg: 'User already exist!'})
        }
}

//LOGIN
export const loginController = async(request, response)=>{
    const {username, password}= request.body; //get username and password from request body

    try {
        const user = await login(username)

        if(user.length === 0){
            return response.status(404).json({msg: 'Username not found'})
        }

        //check password
        const match = bcrypt.compareSync(password + "", user[0].password)

        if(!match)return response.status(400).json({msg: 'Incorrect password'})

        //Create token
        const accessToken=await generateAccessToken(user[0].userid, user[0].username, user[0].role)
        
        //send to cookie
        response.cookie('token', accessToken, {httpOnly: true, maxAge: 60 * 1000 * 60 * 24});

        
        return response.json({token:accessToken})
        
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: "Something went wrong"})
        }       
}

// Clearing the token
export const logoutController = (request, response) => {
    request.headers['x-access-token'] = null;
    response.clearCookie('token');
    return response.sendStatus(200);
};

    
//UPDATE USER
export const updateUserController = async(request, response)=>{
    const userid = request.params.userid
    const username = request.body.username;
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;
    const password = request.body.password +''; //to make it string
    const about = request.body.about;
    //hide password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    try { 
        const user = await updateUser(userid, username, firstname, lastname, hashPassword, about)
        response.json(user)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message}) 
        }
}

//DELETE USER
export const deleteUserController = async(request, response)=>{
    const userid = request.params.userid;
    try {
        await deleteUser(userid);
        response.json({ msg: 'User deleted successfully.'});
            
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to delete user.' });
        }
} 