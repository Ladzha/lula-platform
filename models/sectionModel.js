import {db} from '../config/db.js';

//GET ALL SECTION
export const getAllSection  = async ()=>{
    try {
        const sectionList = await db('section')
        .select('*')
        .returning(["sectionid", "name"])
        // console.log("sectionList=>",  sectionList)
        return sectionList;
        
    } catch (error) {
        console.log(error);
        throw new Error(error.message);    
    }
}

//GET SECTION BY ID
export const getSection = async (sectionid)=>{
    try {
        const section = await db('section')
        .select('*')
        .where('sectionid', sectionid)
        return section;      

    } catch (error) {
        console.log(error); 
        throw new Error(error.message);    
    }
}

//ADD SECTION
export const addSection = ({name}) => {
    return db('section')
    .insert ({name})
    .returning(["sectionid", "name", "preview"])
  }

//UPDATE SECTION
export const updateSection = ({name}, sectionid) => {
    return db('section')
    .update({name})
    .where('sectionid', sectionid)
    .returning(["sectionid", "name", "preview"])
  }
  
  //DELETE SECTION
  export const deleteSection = (sectionid) => {
    return db('section')
    .where('sectionid', sectionid)
    .del()
    .returning(["sectionid", "name", "preview"])
  }
