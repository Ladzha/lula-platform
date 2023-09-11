import axios from 'axios';

export const LanguageService = {

    async getAll() {
        try {
        const response = await axios.get('/api/language')
        if(response){
            return response.data;
        }else{
            console.log('Failed to find language');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async getById(id) {
        try {
        const response = await axios.get(`/api/language/${id}`)

        if(response){
            return response.data;
        }else{
            console.log('Failed to find language');
        }
        } catch (error) {
            console.log(error);
        }
    }

}