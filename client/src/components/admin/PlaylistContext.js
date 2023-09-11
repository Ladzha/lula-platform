import React, { createContext, useContext, useState, useEffect} from 'react';
import {PendingService} from '../../services/pending.service.js';

const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(()=>{
    const fetchData = async()=>{
      const pendingData = await PendingService.getAll()
      setPlaylist(pendingData)
    }
    fetchData()
  }, []) 

  return (
    <PlaylistContext.Provider value={{ playlist, setPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
