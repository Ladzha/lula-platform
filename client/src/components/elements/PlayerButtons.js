import React from 'react'

import NextButton from '../../img/next-icon.svg';
import PlayButton from '../../img/play-icon.svg';
import PrevButton from '../../img/prev-icon.svg';
const PlayerButtons = () => {

    const handlePrevious =()=>{
        console.log('handle Previous');
    }

    const handleNext =()=>{
        console.log('handle Next');
    }

    const handlePlay =()=>{
        console.log('handle Play');
    }
    
  return (
    <div className='playerButtonsBox'>
        <img className='playerIcons' src={PrevButton} onClick={handlePrevious}/>
        <img className='playerIcons' src={PlayButton} onClick={handlePlay}/>
        <img className='playerIcons' src={NextButton} onClick={handleNext}/>
    </div>
  )
}

export default PlayerButtons