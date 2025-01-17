import axios from 'axios';
import { APP_ID, URL_API_Portal } from './dataVariable';

const http = axios.create({
    baseURL: URL_API_Portal
});

class verifyService {
    getUser(id, headers) {
        return http.get(`user/get/${id}`, headers);
    }

    getAkses(headers) {
        return http.get(`akses/app/get/${APP_ID}`, headers);
    }
}

export default new verifyService();
