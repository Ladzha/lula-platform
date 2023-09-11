import React from 'react';
import {PendingService} from '../../services/pending.service.js';

import {PlaylistProvider, usePlaylist } from './PlaylistContext';

import {useState, useEffect} from 'react';
import AudioPlayerPending from './AudioPlayerPending'

const AllPending =()=>{
  
  return(
    <div className='box listRecord'>

      <PlaylistProvider>
        <AudioPlayerPending/>
      </PlaylistProvider>
      
    </div>)
}
export default AllPending
