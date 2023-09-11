import {db} from '../config/db.js';

export const getAllLanguage  = async ()=>{
    try {
        const languageList = await db('language')
        .select('*')
        .returning(["languageid", "language"])
        // console.log("languageList=>",  languageList)
        return languageList;
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}

//GET LANGUAGE BY ID
export const getLanguage = async (languageid)=>{
    try {
        const lamguage = await db('language')
        .select('*')
        .where('languageid', languageid)
        return lamguage;      

    } catch (error) {
        console.log(error); 
        throw new Error(error.message);    
    }
}

//ADD LANGUAGE
export const addLanguage = ({language}) => {
    return db('language')
    .insert ({language})
    .returning(["languageid", "language"])
  }

  
  //DELETE LANGUAGE
  export const deleteLanguage = (languageid) => {
    return db('language')
    .where('languageid', languageid)
    .del()
    .returning(["languageid", "language"])
  }



