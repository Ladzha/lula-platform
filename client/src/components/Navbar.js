import React, {useContext, useState, useEffect} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai";
import { UserService } from '../services/user.service.js';
import { AvatarService } from '../services/avatar.service.js';
import { AppContext } from '../App.js';
import jwtDecode from 'jwt-decode';

const Navbar = () => {

  const navigate = useNavigate ();
  const { token, handleLogout  } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [role, setRole] = useState('');

  const [user, setUser]=useState([{}]);
  const [avatar, setAvatar]=useState([{}]);

  useEffect(()=>{
    if(token){
      const decodedToken = jwtDecode(token); 
      setUsername(decodedToken.username);
      setUserid(decodedToken.userid);
      setRole(decodedToken.role);
    }else{
      console.log("There is no token");
    }

}, [token])

  const logout = async () => {
    try {
      const response = await UserService.logout();
      handleLogout();
      if(!response) return;
    
    if (response.status === 200) {
      navigate('/');
    }
    } catch(error) {
    console.log(error);
    }
  }
  
  useEffect(() => {
    if (!userid) return;
    const fetchData = async () => {
      try {
        const userData = await UserService.getById(userid);
        setUser(userData);

        if (userData.avatarid) {
          const avatarData = await AvatarService.getById(userData.avatarid);
          setAvatar(avatarData);
          }

        } catch (error) {
            console.log(error);
        }
    };
    fetchData();
}, [userid]);

  return (
    <div className='navbar'>
      <ul>
        <li><NavLink to="/"><AiFillHome className='icon-grey icon-home'/></NavLink></li>
      </ul>

      <ul>
      {token ? (
        <>  
        <li><NavLink to={`/profile/${userid}`}><img src={avatar[0].link} className='userIconNav' alt={`avatar ${username}`}/></NavLink></li>
        <li className="link"><NavLink to={`/profile/${userid}`} className='link'>{username}</NavLink></li>
        <li className='divider'>  |  </li>
        <li><NavLink to="/login" className="link" onClick={logout}>Logout</NavLink></li>      
        {role==='admin'? (
          <>
          <li className='divider'>  |  </li>
          <li className='link'><NavLink to='/admin'>Admin Zone</NavLink></li>
          </>):(<></>)}
        
        </>):(<>

        <li><NavLink to="/login" className='link'>Login</NavLink></li>
        
        <li className='divider'>  |  </li>
        <li><NavLink to='/register' className='link'>Register</NavLink></li>
        {/* <li><NavLink to="/contact" className='link'>Contact us</NavLink></li> */}
        </>)

        }
        </ul>
    </div>
  )
}

export default Navbar