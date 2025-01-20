import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class saldoPeScmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`saldope/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`saldope/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('saldope');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('saldope/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`saldope/get/${id}`);
    }
})();
