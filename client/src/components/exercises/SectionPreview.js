import React, {useEffect, useState} from 'react';
import { SectionService } from '../../services/section.service.js';
import { LanguageService } from '../../services/language.service.js';
import { Link } from 'react-router-dom';

const SectionPreview = ({sectionid}) => { // put id from parent component in loop 

  const [language, setLanguage]=useState([{}]);
  const [section, setSection]=useState([{}]);

  useEffect(() => {
    if (!sectionid) return;

    const fetchData = async () => {
      try {
        const sectionData = await SectionService.getById(sectionid); //Get data of one section by id

        if(sectionData && sectionData.length >0){
          setSection(sectionData);      
        }

        const languageData = await LanguageService.getById(1); //Get data of one img by id        
        if(languageData&&languageData.length>0){
          setLanguage(languageData);
        }

      } catch (error) {
          console.log(error);
      }
  };
    fetchData();
}, [sectionid]);

  return (<>

    {sectionid && language[0]?.languageid && section.length > 0 ?(
      <div className='previewBox'>
      {sectionid && language[0].languageid && section.length>0 ? (<>
      <Link to={`/section/${sectionid}`}><img className='imgPreview'src={section[0].preview}/></Link>
      <div className='previewInfo'>
      <Link to={`/language/${language[0].languageid}`}><p className='sectionButton'>{language[0].language}</p></Link>
      <Link to={`/section/${sectionid}`}><p className='sectionButton'>{section[0].name}</p></Link>
      </div>   
      </>):(<div className='loading'>Loading...</div>)}
    </div>
    ):(<div className='loading'>Loading...</div>)}

  </>

  )
}

export default SectionPreview