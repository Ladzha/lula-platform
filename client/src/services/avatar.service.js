import axios from 'axios';

export const AvatarService = {

    async getAll() {
        try {
        const response = await axios.get('/api/avatar')
        if(response){
            return response.data;
        }else{
            console.log('Failed to find avatar');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async getById(id) {
        try {
        const response = await axios.get(`/api/avatar/${id}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find avatar');
        }
        } catch (error) {
            console.log(error);
        }
    }

}