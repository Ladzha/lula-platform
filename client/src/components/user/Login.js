import React, {useRef, useState,  useEffect, useContext} from 'react'
import {Link, useNavigate  } from 'react-router-dom';
import { UserService } from '../../services/user.service.js';

import { AppContext } from "../../App.js";

const Login = () => {

   const formRef = useRef();
   const [msg, setMsg] = useState('');
   const { setToken } = useContext(AppContext);
   const navigate = useNavigate ();

  const handleSubmit = async (event)=>{
    event.preventDefault()
    const username = event.target.username.value;
    const password = event.target.password.value;
    console.log(username, ' ', password)

    try {
      const userData = await UserService.login(username, password);
      setToken(userData.token); //set token in App.js
      // console.log('token', userData.token);

      console.log('userData', userData)
      formRef.current.reset();  //clean inputs
      setMsg('Login successful')
      navigate('/');
    
    } catch (error) {
          console.log(error)
          setMsg('Login failed')   
      }

  }
  return (
    <div className='registerBox box'>
      <p className='title'>Login</p>
      <form className='form' onSubmit={(event)=>handleSubmit(event)} ref={formRef}>
        <input className="input" type='text' name="username" placeholder='username' required/>
        <input className="input" type='password' name="password" placeholder='password' required/>
        <button className='submitButton' type="submit">Login</button>
      </form>
      {msg && <p className={msg === 'Login successful' ? 'successMsg' : 'errorMsg'}>{msg}</p>}
      <p className='hint'>Don't have an account?</p>
      <p className='hint'><Link to="/register" className="boldLink">Sing Up</Link></p>


    </div>
  )
}

export default Login