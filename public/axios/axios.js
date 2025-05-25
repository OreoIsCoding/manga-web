import axios from 'axios';

const baseUrl = 'https://api.mangadex.org';

const api = axios.create({
  baseURL: baseUrl,
   
  headers: {
    'Content-Type': 'application/json',  
    'Accept': 'application/json', 
  },
});
export default api;