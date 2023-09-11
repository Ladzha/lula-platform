import React,{useContext} from 'react';
import { AvatarService } from '../../services/avatar.service.js';
import { UserService } from '../../services/user.service.js';
import { useState, useEffect, useParams } from 'react';
import { PendingElementContext } from './PendingElement.js';
const OneUser = ({id}) => {

    const [user, setUser]=useState([]);
    // const [avatar, setAvatar]=useState([{}]);

    const {avatar, setAvatar} = useContext(PendingElementContext)

    useEffect(() => {
      if (!id) return;
      const fetchData = async () => {
          try {
              const userData = await UserService.getById(id);
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
  }, [id]);
if(!avatar) return null
  return (
    <div>
      One user and avatar
      <p>Avtar: {avatar[0].name}</p>
      <p>User Username: {user.username}</p>
    </div>
  )
}

export default OneUser