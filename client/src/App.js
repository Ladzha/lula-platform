import './App.css';
import React from 'react';
import { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";


import AppRouter from './AppRouter';

export const AppContext = createContext();

function App() {
  const [token, setToken] = useState(null);
  const handleLogout = () => {
    // Clear token from the context when logging out
    setToken(null);
  };
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ token, setToken, handleLogout }}>
      
        <AppRouter/>

      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
