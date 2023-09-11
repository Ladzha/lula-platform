import React, {useState, useEffect} from 'react'
import { SectionService } from '../services/section.service.js';
import SectionPreview from './exercises/SectionPreview.js'

const Home = () => {
  const [sectionPreviews, setSectionPreviews]=useState([])
//Get all sections
  useEffect(()=>{
    const fetchData = async()=>{
      const data = await SectionService.getAll()
      setSectionPreviews(data)        
    }
    fetchData()
  }, [])
    if (!sectionPreviews) {
    return <div className='loading'>Loading...</div>;
  }
    return(
      <div className='containerColumn'>
        <p className='titleHomeMain'> Listen Up and Learn with Lula </p>
        <p className='moto'>Learn real language from real people</p>
        <p className='instruction'><span className='bold'>Welcome to Lula</span> - your gateway to authentic language learning!<br/>Immerse yourself in real-world conversations, hear diverse accents, and grasp the essence of language through audio records. Whether you're exploring new scenarios or contributing your voice, Lula empowers you to learn and connect like never before. Start your journey today and experience language in its truest form.</p>
          <div className='homeContainer'>
          {sectionPreviews && sectionPreviews.length > 0 ? (<>
            {sectionPreviews.map((preview, index)=>{
            return( 
              <div key={index}>  
                <SectionPreview sectionid={preview.sectionid}/>
              </div>)})}
            </>
            ):(<div className='loading'>Loading...</div>)}

          </div>
      </div>)
  }
export default Home