import React from 'react'
import { ImgService } from '../services/img.service.js';
import { LanguageService } from '../services/language.service.js';

import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ExercisePreview from '../components/exercises/ExercisePreview.jsx';

const Language = () => {

  const { languageid } = useParams();
  const [language, setLanguage]=useState(null)

  const [previews, setPreviews]=useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (languageid) {
          const languageData = await LanguageService.getById(languageid);
          if (languageData && languageData[0]) {
            setLanguage(languageData);
            const imgData = await ImgService.getAllByLanguageId(languageid);
            if (imgData) {
              setPreviews(imgData);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [languageid]);
  
console.log('language', language);

      if (!language) {
        return <div className='loading'>Loading...</div>;
      }
        

      return(
        <div className='containerColumn'>
          {language && language[0] &&(<><p className='titleMain'> Let's learn {language[0].language}</p>
          <p className='instruction'>Welcome to the English Language Section! Explore a world of language learning possibilities by selecting a picture that intrigues you. Each picture leads you to engaging exercises where you can immerse yourself in real English conversations. Choose a scenario, dive in, and enhance your language skills. Let's embark on this language journey together!</p>
              <div className='homeContainer'>
            {previews.length > 0 && previews.map((preview, index)=>{
              return( 
                <div key={index}>
                  <ExercisePreview id={preview.imgid}/>
                </div>)})}
          </div></>)}
        </div>
      )
  }
export default Language