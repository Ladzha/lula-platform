import React, {useState, useEffect} from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { PendingService } from '../../services/pending.service.js';
import { AudioService } from '../../services/audio.service.js';

import { usePlaylist } from '../admin/PlaylistContext';

const PendingIconBox = ({recordid}) => {

  const { playlist, setPlaylist } = usePlaylist();

  const handleRejection= async()=>{
    if (!recordid) return;
      try {
        const pendingData = await PendingService.deleteById(recordid);

        if(pendingData){
          const allPendingData=await PendingService.getAll();
          setPlaylist(allPendingData);
        }
        console.log("REJECTED");
      } catch (error) {
        console.log(error);
      }
    };

  const handleApproval= async()=>{
    if (!recordid) return;
      try {
        const pendingData = await PendingService.getById(recordid);

        if(pendingData){
          const audioData = await AudioService.postAudio(
            pendingData[0].userid, 
            pendingData[0].link, 
            pendingData[0].imgid);
 
          handleRejection();
        }

        else{
          console.log("Pending data is undefined or null");
          return;
        }

      } catch (error) {
        console.log(error);
      }
    };


  return (
    <div className='pendingIconBox'>
    <AiFillCheckCircle className='icon-green' onClick={handleApproval}/>
    <AiFillCloseCircle className='icon-red' onClick={handleRejection}/>  
    </div>
  )
} 

export default PendingIconBox