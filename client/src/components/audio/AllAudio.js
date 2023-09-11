import React from 'react';
import { Link } from 'react-router-dom';
import { ImgService } from '../../services/img.service.js';
import { AudioService } from '../../services/audio.service.js';

import {useParams} from 'react-router-dom';

import {useState, useEffect, useContext} from 'react';
import AudioComponent from '../../components/audio/AudioComponent.js';
import AudioPlayer from '../../components/audio/audioPlayer/AudioPlayer'


const AllAudio = () => {

  const { imgid } = useParams();
  
  const [img, setImg]=useState([{}]);
  const [audios, setAudios]=useState([]);

  useEffect(() => {
    if (!imgid) return;

    const fetchData = async () => {
      try {

        const imgData = await ImgService.getById(imgid); //IMG BY ID
        setImg(imgData);

        if(!imgData) return;

        const audiosData = await AudioService.getByImageId(imgid) //GET LIST OF AUDIO BY IMG ID
        console.log(audiosData);
        setAudios(audiosData); 

          } catch (error) {
              console.log(error);
          }
      };

      fetchData();
  }, [imgid]);

  return(
    <div className='containerColumn'>
    <p className='titleMain'> Listen to what they say about it </p>
      <div className='exerciseContainer'>
        {audios && <div className= 'box listRecord'>
          <AudioPlayer playlist={audios}/> 
          {audios.length > 0 && audios.map((audio, index)=>{
            return( 
              <div key={index}>
                <AudioComponent id={audio.recordid}  duration={`${0}:${0}`} created={new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                }).format(new Date(audio.created))}/>
              </div>)})}
          </div>}
      <div>
        <img className='imgExercise' src={img[0].link}/>
        <div className='sectionExercise'>
        <Link to="/audio">Audio</Link>...
        <Link to="/record">Record</Link>
      </div>
        </div>
      </div>
    </div>
  )
}

export default AllAudio