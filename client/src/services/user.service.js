import axios from 'axios';

export const UserService = {

    async getAll() {
        try {
        const response = await axios.get('/api/users')
        if(response){
            return response.data;
        }else{
            console.log('Failed to find users');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async getById(id) {
        try {
        const response = await axios.get(`/api/users/${id}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to find user');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async register(username, firstname, lastname, email, password, avatarid ) {
        try {
        const response = await axios.post('/api/users/register', {
            username,
            firstname,
            lastname,
            email,
            password,
            avatarid
        }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        if(response && response.data){
            return response.data;
        }else{
            console.log('Failed to register user');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async login(username, password ) {
        try {
        const response = await axios.post('/api/users/login', {
            username,
            password

        }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        if(response.status === 200 && response.data){
            return response.data;
        }else{
            console.log('Failed to login user');
        }
        } catch (error) {
            console.log(error);
        }
    },

    async logout() {
        try {
        const response = await axios.delete('/api/users/logout');
        if (response.status === 200) {
        }
        } catch(error) {
        console.log(error);
        }
    },

    async updateById(id) {
        try {
        const response = await axios.put(`/api/users/update/${id}`)
        if(response){
            return response.data;
        }else{
            console.log('Failed to update user');
        }
        } catch (error) {
            console.log(error);
        }
    },
}
