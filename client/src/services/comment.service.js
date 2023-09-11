import axios from 'axios';

export const CommentService = {

    async getAll() {
        try {
        const response = await axios.get('/api/comment')
        if(response){
            return response.data;
        }else{
            console.log('Failed to find comment');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async getById(id) {
        try {
        const response = await axios.get(`/api/comment/${id}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find comment');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async getByAudioId(id) {
        try {
        const response = await axios.get(`/api/comment/${id}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find comment');
        }
        } catch (error) {
            console.log(error);
        }
    },
    

    async getByUserId(id) {
        try {
        const response = await axios.get(`/api/comment/user/${id}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find comment');
        }
        } catch (error) {
            console.log(error);
        }
    },

    
    async getByAudioId(id) { 
        try {
        const response = await axios.get(`/api/comment/audio/${id}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find comment');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async postComment(userid, recordid, text) {
        try {
        const response = await axios.post('/api/comment/post', {
            userid, 
            recordid,
            text
        })
        if(response){
            return response.data;
        }else{
            console.log('Failed to post comment');
        }
        } catch (error) {
            console.log(error);
        }
    }

}
