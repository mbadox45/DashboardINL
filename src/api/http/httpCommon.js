import axios from 'axios';
import { URL_API, URL_API_INL_EDGE } from './dataVariable';

export const httpCommonFromDaico = axios.create({
    baseURL: URL_API,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const httpCommonThisAPI = axios.create({
    baseURL: URL_API_INL_EDGE,
    headers: {
        'Content-Type': 'application/json'
    }
});

// export default axios.create({
//     baseURL: URL_API,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });
