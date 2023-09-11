import axios from 'axios';

export const ImgService = {

    async getAll() {
        try {
        const response = await axios.get('/api/img')
        if(response){
            return response.data;
        }else{
            console.log('Failed to find img');
        }
        } catch (error) {
            console.log(error);
        }
    },
    async getById(id) {
        try {
        const response = await axios.get(`/api/img/${id}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find img');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async getAllBySectionId(sectionid) {
        try {
        const response = await axios.get(`/api/img/section/${sectionid}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find img');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async getAllByLanguageId(languageid) {
        try {
        const response = await axios.get(`/api/img/language/${languageid}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find img');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async getByIdInfo(id) {
        try {
        const response = await axios.get(`/api/img/details/${id}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find img');
        }
        } catch (error) {
            console.log(error);
        }
    }

}
