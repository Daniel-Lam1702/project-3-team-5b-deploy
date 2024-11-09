// apiService.js
import axios from 'axios';

//To prevent accidentally leaking env variables to the client,
// only variables prefixed with VITE_ are exposed to your Vite-processed code
const baseUrl = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : import.meta.env.VITE_POS_API_BASE_URL;


export const getData = async (endpoint) => {
    const response = await axios.get(`${baseUrl}/api/${endpoint}`);
    return response.data;
};
