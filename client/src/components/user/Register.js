import React, {useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserService } from '../../services/user.service.js';


const Register = () => {

const navigate = useNavigate();

  const formRef = useRef();
  const [msg, setMsg] = useState('');

  // Generate a random number fo avatarid
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const randomNumber = getRandomNumber(1, 10);

  const handleSubmit =async (event)=>{
    event.preventDefault()

    const username = event.target.inputUsername.value;
    const firstname = event.target.inputFirstName.value;
    const lastname = event.target.inputLastName.value;
    const email = event.target.inputEmail.value;
    const password = event.target.inputPassword.value;
    const avatarid= randomNumber;

    try {
      const userData = await UserService.register(username, firstname, lastname, email, password, avatarid);
      if(userData){
        setMsg('You registered successfully')
        formRef.current.reset();  //clean inputs 
        navigate('/login')
      }
      else{
        setMsg('User already exist');
      }
      console.log(userData);
      
    } catch (error) {
      if (error.response) {
               
      } else {
        setMsg('Registration failed');
      } 
    }
  }


  

  return (
    <div className='registerBox box'>
      <p className='title'>Create Account</p>
      <form className='form' onSubmit={(event)=>handleSubmit(event)} ref={formRef}>
        <input className="input" type='text'id="inputUsername" name="inputUsername" placeholder='Username' required/>
        <input className="input" type='text' id="inputFirstName" name="inputFirstName" placeholder='First Name' required/>
        <input className="input" type='text' id="inputLastName" name="inputLastName" placeholder='Last Name' required/>
        <input className="input" type='email' id="inputEmail" name="inputEmail" placeholder='Email' required/>
        <input className="input" type='password' id="inputPassword" name="inputPassword" placeholder='Password' required/>
        <button className='submitButton' type="submit">Register</button>   
      </form>
      {msg && <p className={msg === 'You registered successfully' ? 'successMsg' : 'errorMsg'}>{msg}</p>}
      <p className='hint'>Already have an account?</p>
      <p className='hint'><Link to="/login"className="boldLink">Login</Link></p> 
    </div>
  )
}

export default Register