import React from 'react';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const Record = () => {
  const recorderControls = useAudioRecorder()
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
    console.log(audio.src);
  };

  return (
    <div className='homeContainer'>
      <AudioRecorder 
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <button className='submitButton' onClick={recorderControls.stopRecording}>Stop recording</button>
      <button className='submitButton'>Send to review</button>
      <button className='submitButton'>Delete record</button>
    </div>
  )
}

export default Record