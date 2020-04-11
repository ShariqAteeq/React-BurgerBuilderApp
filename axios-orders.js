import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-app-849f0.firebaseio.com/'
});

export default instance;