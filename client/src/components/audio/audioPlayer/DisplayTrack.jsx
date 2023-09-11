import React from 'react';

const DisplayTrack = ({
  currentTrack, 
  audioRef,
  progressBarRef,
  setDuration}) => {

    const onLoadedMetadata = () =>{
      // console.log("DURATION", audioRef.current.duration);
      // const seconds = audioRef.current.duration;
      // setDuration(seconds)
      // progressBarRef.current.max=seconds; 
    }

  return (
    <div>
      <audio 
      src={currentTrack && currentTrack.link}  
      ref={audioRef}
      onLoadedMetadata={onLoadedMetadata}/>  
    </div>
  )
}

export default DisplayTrack