import { httpAuthThisAPI } from '@/api/http/httpAuth';
import { httpCommonThisAPI } from '@/api/http/httpCommon';

export default new (class incomingCpoScmAPI {
    addPost(data) {
        return httpAuthThisAPI.post(`income-cpo/add`, data);
    }
    updatePost(id, data) {
        return httpAuthThisAPI.post(`income-cpo/update/${id}`, data);
    }

    getAll() {
        return httpCommonThisAPI.get('income-cpo');
    }
    getByPeriod(date) {
        return httpCommonThisAPI.post('income-cpo/period', date);
    }
    getByID(id) {
        return httpCommonThisAPI.get(`income-cpo/get/${id}`);
    }
})();
