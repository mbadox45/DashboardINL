import axios from 'axios';
import { URL_API, URL_API_INL_EDGE } from './dataVariable';

export const httpAuthFromDaico = axios.create({
    baseURL: URL_API,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('usertoken')}`,
        'Access-Control-Allow-Methods': '*'
    }
});

export const httpAuthThisAPI = axios.create({
    baseURL: URL_API_INL_EDGE,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('usertoken')}`,
        'Access-Control-Allow-Methods': '*'
    }
});
