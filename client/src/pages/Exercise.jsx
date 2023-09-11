import React from 'react';
import { ImgService } from '../services/img.service.js';
import { AudioService } from '../services/audio.service.js';
import { Link } from 'react-router-dom';

import {useParams} from 'react-router-dom';

import {useState, useEffect} from 'react';
import AudioPlayer from '../components/audio/audioPlayer/AudioPlayer'


const Exercise = () => {

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
        // console.log(audiosData);
        if(audiosData && audiosData.length>0){
          setAudios(audiosData); 
        }
        
          } catch (error) {
              console.log(error);
          }
      };
      fetchData();
  }, [imgid]);

  return(
    <>
    {img?(    <div className='containerColumn'>
    <p className='titleMain'> Listen to what they say about this photo </p>
    <p className='instruction'>Get ready to enhance your language skills through interactive exercises. <br/>Listen to audio recordings from real people discussing different scenarios. Absorb the nuances of language as it's naturally spoken, and feel free to leave comments or even create your own recordings to enrich the learning experience. Let's get started!</p>
    <div>
        
        <div className='exerciseContainer'>
        <img className='imgExercise' src={img[0].link} alt="exercise-preview"/>
            <div className= 'box listRecord'>
              <AudioPlayer playlist={audios}/>
              <Link to={`/section/${img[0].sectionid}`} ><p className='languageButton'>Back</p></Link>       
            </div>
        </div>
      </div>
    </div>):(<div className='loading'>Loading...</div>)}
    </>

  )
}

export default Exercise