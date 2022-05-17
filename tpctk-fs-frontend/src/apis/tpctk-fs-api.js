import config from '../config'
import axios from 'axios';
const BASE_URL = `${config.apiBasePath}/api/v1`;

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});