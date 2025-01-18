import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class kursAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`kurs/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`kurs/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('kurs');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('kurs/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`kurs/get/${id}`);
    }
})();
