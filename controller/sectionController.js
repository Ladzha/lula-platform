import { getAllSection, getSection, addSection, updateSection, deleteSection } from '../models/sectionModel.js';

//GET ALL SECTIONS
export const getAllSectionController = async(request, response)=>{
    try {
        const sectionList = await getAllSection();
        response.json(sectionList)           
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch sections.'})
        }
} 

//GET SECTION BY ID
export const getSectionController= async(request, response)=>{
    const sectionid = request.params.sectionid;
    try {
        const section = await getSection(sectionid);
        if(section){
            response.json(section);
        }else{
            response.status(404).json({ msg: 'Section not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch section.'})
        }
}

//ADD SECTION
export const addSectionController = async(request, response)=>{
    const name = request.body.name;

    try {
        const section = await addSection({name})
        response.json(section)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message})
        }
}

//UPDATE SECTION
export const updateSectionController = async(request, response)=>{
    const sectionid = request.params.sectionid;
    const name = request.body.name;

    try {
        const section = await updateSection({name}, sectionid)
        response.json(section)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message}) 
        }
}

//DELETE SECTION
export const deleteSectionController = async(request, response)=>{
    const sectionid = request.params.sectionid;
    try {
        await deleteSection(sectionid);
        response.json({ msg: 'Section deleted successfully.'});
            
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to delete section.' });
        }
}