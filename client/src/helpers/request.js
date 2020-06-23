import Axios from 'axios';

import { authHeader } from './index';

export const requestNoJWT = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 6000,
    headers: { 
        'Content-Type': 'application/json'
    }
});


export const request = Axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 6000,
    headers: { 
        'Content-Type': 'application/json',
        ...authHeader()
    }
});