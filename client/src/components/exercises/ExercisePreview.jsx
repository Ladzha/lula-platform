import React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ImgService } from '../../services/img.service.js';
import { LanguageService } from '../../services/language.service.js';
import { SectionService } from '../../services/section.service.js';

const ExercisePreview = ({ id }) => {

  const [img, setImg]=useState([{}]);
  const [language, setLanguage]=useState([{}]);
  const [section, setSection]=useState([{}]);

    useEffect(() => {
      if (!id) return;
      const fetchData = async () => {
        try {

          const imgData = await ImgService.getById(id);
          if (imgData && imgData.length > 0) {
            setImg(imgData)};
          

          if(imgData[0].sectionid){
            const sectionData = await SectionService.getById(imgData[0].sectionid);
            if (sectionData && sectionData.length > 0) {
              setSection(sectionData);
            }
          }

          if (imgData[0].languageid) {
            const languageData = await LanguageService.getById(imgData[0].languageid);
            if (languageData && languageData.length > 0) {
              setLanguage(languageData);
            }
          }

        } catch (error) {
            console.log(error);
        }
      };
        fetchData();
    }, [id]);
    return (
      <>
      {img.length >0 ?(<div className='previewBox'>
        <Link to={`/exercise/${img[0].imgid}`} ><img className='imgPreview' src={img[0].link}/></Link>
        <div className='previewInfo'>
        <Link to={'/'} ><p className='languageButton'>Back</p></Link>
        <Link to={`/exercise/${img[0].imgid}`} ><p className='sectionButton'>Learn</p></Link>
        </div>
      </div>) :(<div className='loading'>Loading...</div>)}
      </>

    )
  }
    
export default ExercisePreview