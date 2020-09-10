import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.climacell.co/v3/weather"
});

export default instance;