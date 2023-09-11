import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { usePlaylist } from './PlaylistContext';
import ProgressBar from '../audio/audioPlayer/ProgressBar.jsx'
import PendingComponent from './PendingComponent'
import AudioControls from '../audio/audioPlayer/AudioControls.jsx'
import DisplayTrack from '../audio/audioPlayer/DisplayTrack'

const AudioPlayerPending = () => {

  const audioRef = useRef(); //to get audio tag in html
  const progressBarRef = useRef(); //to get input range tag in html
  const { playlist } = usePlaylist(); 
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [timeProgress, setTimeProgress]=useState(0); //to get current time of audio
  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [duration, setDuration]=useState(0); //to get duration of the audio
  const [isPlaying, setIsPlaying] = useState(false); //play or not


const formatTime = (time)=>{
  const minutes = Math.floor(time/60);
  const seconds = Math.floor(time/60);
  return `${minutes}:${seconds.toString().padStart(2,'0')}`;
};

  useEffect(() => {
    if (playlist && playlist.length > 0) {
      setCurrentTrack(playlist[currentTrackIndex]);
    }
  }, [playlist]);

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

  const onLoadedMetadata = () =>{
    const seconds = audioRef.current.duration;
    setDuration(seconds)
    progressBarRef.current.max=seconds;
  }

  return (    
    <div className='innerd'>
      {playlist.length ? (
      <div>

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

    {playlist.length > 0 && playlist.map((audio, index)=>(
      <div key={index}>
        <PendingComponent 
        recordid={audio.recordid} 
        // currentTrackIndex={currentTrackIndex}
        classname={currentTrackIndex === index ? 'selected' : ''}
        created={new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        }).format(new Date(audio.created))}
        onPlayClick={() => handlePlayPause(index)}
        isPlaying={isPlaying && currentTrackIndex === index}/>        
      </div>
      ))}
    </div>
    ):(
    <p>There are no pending audios</p>
    )}
    </div>)
}

export default AudioPlayerPending 