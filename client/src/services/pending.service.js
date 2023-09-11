import axios from 'axios';

export const PendingService = {

  async getAll() { //token v headers
    try {
      const response = await axios.get('/api/pending') //,{headers: {'x-access-token': token}}
      if(response){
        return response.data;
      }else{
        console.log('Failed to find audio');
      }
    } catch (error) {
        console.log(error);
    }
  },
 
  async getById(recordid) {
    try {
      const response = await axios.get(`/api/pending/${recordid}`)
      if(response){
        return response.data;
      }else{
        console.log('Failed to find audio');
      }
    } catch (error) {
        console.log(error);
    }
  },

  async postAudio(userid, name, link, imgid) { 
    try {
    const response = await axios.post(`/api/audio/post`, {
      userid, 
      name,
      link,
      imgid
    }) 
    if(response){
        return response.data;
    }else{
        console.log('Failed to post audio');
    }
    } catch (error) {
        console.log(error);
    }
  },


  async uploadRecord(blob) { 
    try {
    const response = await axios.post('/api/pending/upload-single', {
      blob
    }) 
    if(response){
        return response.data;
    }else{
        console.log('Failed to upload record');
    }
    } catch (error) {
        console.log(error);
    }
  },

  async getAudioWithUserInfo(recordid) {
    try {
      const response = await axios.get(`/api/pending/info/userinfo/${recordid}`);
      if (response) {
        return response.data;
      } else {
        console.log('Failed to fetch pending audio with user info');
      }
    } catch (error) {
      console.log(error);
    }
  },

  async deleteById(recordid) {
    try {
      const response = await axios.delete(`/api/pending/delete/${recordid}`)
      if(response){
          return response.data;
      }else{
          console.log('Failed to delete audio');
      }
    } catch (error) {
        console.log(error);
    }
  }

}