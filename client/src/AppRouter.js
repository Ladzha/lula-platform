import './App.css';
import React from 'react';

import { Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Exercise from './pages/Exercise.jsx'
import Section from './pages/Section'
import Language from './pages/Language'

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';

import Record from './components/audio/Record';
import Home from './components/Home';
import AdminZone from './pages/AdminZone';
import Contact from './components/admin/Contact';
import Auth from './pages/Auth';

function AppRouter() {

  return (
    <div className="App">
      <Auth>
      <Navbar/>
      <div className="mainContainer">

      <Routes>
      <Route path='/' element={<Home/>}/> /*shows all sections*/
      <Route path='/profile/:userid' element={<Profile/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/record' element={<Record/>}/>
         
      <Route path='/admin' element={<AdminZone/>}/>
      <Route path='/contact' element={<Contact/>}/>
      

      <Route path='/section/:sectionid' element={<Section/>}/> /*shows details about one section and all exercises*/
      <Route path='/exercise/:imgid' element={<Exercise/>}/> /*shows one exercise*/
      <Route path='/language/:languageid' element={<Language/>}/> /*shows all exercise in one language*/
      </Routes>
      
      </div>
      <Footer/>
      </Auth>
    </div>
  );
}

export default AppRouter;
