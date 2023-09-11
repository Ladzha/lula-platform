import { getAllImg, getImg, getImgBySectionId, getImgByLanguageId, addImg, updateImg, deleteImg, getImgInfo } from '../models/imgModel.js';
//GET ALL IMAGES
export const getAllImgController = async(request, response)=>{
    try {
        const imgList = await getAllImg();
        response.json(imgList)           
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch images.'})
        }
} 

//GET IMG BY ID
export const getImgController= async(request, response)=>{
    const imgid = request.params.imgid;
    try {
        const image = await getImg(imgid);
        if(image){
            response.json(image);
        }else{
            response.status(404).json({ msg: 'Image not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch image.'})
        }
}

//GET LIST OF IMG BY SECTIONID
export const getImgSectionController= async(request, response)=>{
    const sectionid = request.params.sectionid;
    try {
        const img = await getImgBySectionId(sectionid);
        if(img){
            response.json(img);
        }else{
            response.status(404).json({ msg: 'Img not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch img.'})
        }
}

//GET LIST OF IMG BY LANGUAGEID
export const getImgLanguageController= async(request, response)=>{
    const languageid = request.params.languageid;
    try {
        const img = await getImgByLanguageId(languageid);
        if(img){
            response.json(img);
        }else{
            response.status(404).json({ msg: 'Img not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch img.'})
        }
}


//GET IMG BY ID AND ALL INFO
export const getImgInfoController= async(request, response)=>{
    const imgid = request.params.imgid;
    try {
        const imageDetails = await getImgInfo(imgid);
        if(imageDetails){
            response.json(imageDetails);
        }else{
            response.status(404).json({ msg: 'Image not found.' });
        }               
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to fetch image.'})
        }
}



//ADD IMAGE
export const addImgController = async(request, response)=>{
    const name = request.body.name;
    const link = request.body.link;
    const sectionid = request.body.sectionid;
    const languageid = request.body.sectionid;
    try {
        const img = await addImg({name, link, sectionid})
        response.json(img)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message})
        }
}

//UPDATE IMAGE
export const updateImgController = async(request, response)=>{
    const imgid = request.params.recordid

    const name = request.body.name;
    const link = request.body.link;
    const sectionid = request.body.sectionid;
    const languageid = request.body.sectionid;

    try {
        const img = await updateImg({imgid, name, link, sectionid,languageid})
        response.json(img)
            
        } catch (error) {
            console.log(error)
            response.status(404).json({msg: error.message}) 
        }
}

//DELETE IMAGE
export const deleteImgController = async(request, response)=>{
    const imgid = request.params.imgid;
    try {
        await deleteImg(imgid);
        response.json({ msg: 'Img deleted successfully.'});
            
        } catch (error) {
            console.log(error)
            response.status(500).json({ msg: 'Failed to delete img.' });
        }
}

// export const getAudioAndCommentsByImgIdController = async(request, response)=>{
//     const imgid = request.params.imgid;
//     console.log(request.body);
//     const data = await getAudioAndCommentsByImgId(imgid)
//     response.json(data.rows)

// }