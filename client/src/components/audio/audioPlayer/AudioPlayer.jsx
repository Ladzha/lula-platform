import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import ProgressBar from './ProgressBar'
import AudioControls from './AudioControls'
import AudioComponent from '../AudioComponent'
import { AudioRecorder} from 'react-audio-voice-recorder';

import DisplayTrack from './DisplayTrack';

import { AppContext } from '../../../App.js';
import jwtDecode from 'jwt-decode';

const AudioPlayer = ({playlist}) => {

  const audioRef = useRef(); //to get audio tag in html
  const progressBarRef = useRef(); //to get input range tag in html

  //to play track from playlist
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [timeProgress, setTimeProgress]=useState(0); //to get current time of audio
  const [currentTrack, setCurrentTrack] = useState(playlist[0]); //vmesto {}
  const [duration, setDuration]=useState(0); //to get duration of the audio
  const [isPlaying, setIsPlaying] = useState(false); //play or not

  const [showRecord, setShowRecord] =useState(false)
  const { imgid } = useParams();

  //token and userid
  const { token } = useContext(AppContext);
  const [userid, setUserid] = useState('');

  console.log("Load page isPlaying", isPlaying);
  console.log("playlist", playlist);

  const handleShowRecord = () => {
    setShowRecord(!showRecord);
  };

  const formatTime = (time)=>{
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time/60);
    return `${minutes}:${seconds.toString().padStart(2,'0')}`;
  };
  
  useEffect(() => {
    if (playlist && playlist.length > 0) {
      setCurrentTrack(playlist[currentTrackIndex]);
    }
  }, [playlist]); //playlist

  useEffect(()=>{
    if(token){
      const decodedToken = jwtDecode(token); 
      setUserid(decodedToken.userid);
    }else{
      console.log("There is no token");
    }
}, [token])

  const handlePlayPause = (index) => {
    if (currentTrackIndex === index) {

      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }

    } else {
      try {
        if (currentTrackIndex !== null) {
          audioRef.current.pause();
        }
        setCurrentTrackIndex(index);
        setIsPlaying(true);

        if(playlist[index].link){
          audioRef.current.src = playlist[index].link; // Set the audio source
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.then(item => {
              // audioRef.current.pause();
            })
            .catch(error => {
              console.log(error);
              // audioRef.current.pause();
            });
          }
        }
      } catch (error) {
        console.log(error);
        setIsPlaying(false)
        audioRef.current.pause();
      }
    }
  };


//recording audio
  const addAudioElement = async (blob) => { 
    const name = 'as'

    const formData = new FormData();
      formData.append("file", blob);
      formData.append("imgid", imgid);
      formData.append("userid", userid);
      formData.append("name", name);

      try {
        const res = await axios.post("http://localhost:3001/api/pending/upload-single", formData);
      } catch (error) {
        console.log(error.response.data.msg);
      }
  };

  return ( <>
    {playlist ? (
    <div className='innerd'>
      {playlist.length > 0 ? (<>

      {/* Render audio tag */}
      <DisplayTrack 
      currentTrack={currentTrack} 
      audioRef={audioRef}
      progressBarRef={progressBarRef}
      setDuration={setDuration}
      />

      {/* Render audio controls */}

      <AudioControls  
      audioRef={audioRef}
      progressBarRef={progressBarRef}
      duration ={duration}
      setTimeProgress={setTimeProgress}
      
      playlist={playlist}

      currentTrackIndex={currentTrackIndex}
      setCurrentTrackIndex={setCurrentTrackIndex}

      setCurrentTrack={setCurrentTrack}

      isPlaying={isPlaying}
      setIsPlaying ={setIsPlaying}

      //proba
      handlePlayPause={handlePlayPause}/>

      <ProgressBar 
      progressBarRef={progressBarRef} 
      audioRef={audioRef} 
      duration ={duration} 
      timeProgress={timeProgress} />

      {playlist.length > 0 && playlist.map((audio, index)=>{
        return( 
          <div key={index}>
            <AudioComponent 
            id={audio.recordid}  
            created={new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(new Date(audio.created))}

            onPlayClick={() => handlePlayPause(index)}
            isPlaying={isPlaying && currentTrackIndex === index}
            currentTrackIndex={currentTrackIndex}/> 

          </div>)})}

      </>):(<p className='information'>There are no audios yet</p>)}
      {token&& <>
        <p className='hint'onClick={handleShowRecord}>{showRecord?'Hide microphone':'Create record'}</p>
          {showRecord &&  
            <div className='box recorderBox'>
            <AudioRecorder 
              onRecordingComplete={(blob) => addAudioElement(blob)}
              showVisualizer={true}
              downloadOnSavePress={false}
              downloadFileExtension="webm"
              />
            </div>} </>}
      </div> ):(<p className=''> There are no audios yet </p>)}
      </>
  ) 
}

export default AudioPlayer 